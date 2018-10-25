import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Link as LinkRWD, Alert, PageHeader } from 'react-wood-duck';
import UserDetailEdit from './UserDetailEdit';
import UserDetailShow from './UserDetailShow';
import ErrorMessage from '../../common/ErrorMessage';
import Cards from '../../common/Card';

/* eslint camelcase: 0 */
export default class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      alert: false,
      disableActionBtn: true,
      details: props.details,
      resendEmailAlert: false,
      disableEditBtn: props.disableEditBtn,
      XHRStatus: props.XHRStatus,
    };
  }

  componentDidMount() {
    this.props.actions.fetchDetailsActions(
      this.getUserId(this.currentPathname())
    );
    this.props.actions.fetchPermissionsActions();
    this.props.actions.fetchRolesActions();
  }

  componentWillUnmount() {
    this.props.actions.clearDetails();
  }

  currentPathname() {
    return window.location.pathname;
  }

  getUserId(pathname) {
    const pathArray = pathname.split('/');
    const id = pathArray[pathArray.length - 1];
    return id;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const details = nextProps.details;
    const XHRStatus = nextProps.XHRStatus;
    this.setState({ details, XHRStatus });
  }

  handleDropDownChange = name => ({ value }) => {
    const { details } = this.state;
    this.setState({
      details: { ...details, [name]: value },
      disableActionBtn: false,
    });
  };

  handleOnRoleChange = name => ({ value }) => {
    const { details } = this.state;
    this.setState({
      details: { ...details, [name]: [value] },
      disableActionBtn: false,
    });
  };

  handleOnPermissionChange = value => {
    const { details } = this.state;
    this.setState({
      disableActionBtn: false,
      details: { ...details, permissions: value },
    });
  };

  onResendInvite = () => {
    this.props.actions.resendRegistrationEmailActions(this.state.details.email);
    this.setState({ resendEmailAlert: true });
  };

  onSaveDetails = () => {
    const id = this.getUserId(this.currentPathname());
    const { details } = this.state;
    this.props.actions.saveUserDetailsActions(id, details);
    this.setState({
      isEdit: false,
      alert: true,
      resendEmailAlert: false,
    });
  };

  onEditClick = () => {
    this.setState({
      isEdit: true,
      alert: false,
      disableActionBtn: true,
    });
  };

  onCancel = () => {
    this.setState({ isEdit: false, alert: false, resendEmailAlert: false });
    this.props.actions.fetchDetailsActions(
      this.getUserId(this.currentPathname())
    );
  };

  showAlert = (alert, userDetailError) => {
    if (alert) {
      if (userDetailError) {
        return <ErrorMessage error={userDetailError} />;
      } else {
        return (
          <Alert
            alertClassName="success"
            faIcon="fa-check-circle"
            alertCross={false}
          >
            {'Your changes have been made successfully'}
          </Alert>
        );
      }
    }
  };

  emailSent = () => {
    if (
      this.state.resendEmailAlert &&
      this.props.resendEmailStatus === 'Success'
    ) {
      return (
        <Alert
          alertClassName="success"
          faIcon="fa-check-circle"
          alertCross={false}
        >
          {'Registration email has been sent successfully'}
        </Alert>
      );
    }
  };

  renderCards = permissionsList => {
    console.log(this.state);
    return this.state.XHRStatus !== 'ready' ? (
      <Cards>
        <span>{'Loading...'}</span>
      </Cards>
    ) : (
      <div>
        {this.state.details && this.state.details.id ? (
          <div>
            {this.state.isEdit ? (
              <UserDetailEdit
                details={this.state.details}
                selectedPermissions={this.state.details.permissions}
                onCancel={this.onCancel}
                onSave={this.onSaveDetails}
                onStatusChange={this.handleDropDownChange('enabled')}
                onPermissionChange={this.handleOnPermissionChange}
                onRoleChange={this.handleOnRoleChange('roles')}
                disableActionBtn={this.state.disableActionBtn}
                permissionsList={permissionsList}
                onResendInvite={this.onResendInvite}
                disableResendEmailButton={this.props.disableResendEmailButton}
                officesList={this.props.officesList}
                rolesList={this.props.rolesList}
                possibleRoles={this.props.possibleRoles}
              />
            ) : (
              <UserDetailShow
                details={this.state.details}
                onEdit={this.onEditClick}
                permissionsList={permissionsList}
                disableEditBtn={this.props.disableEditBtn}
                officesList={this.props.officesList}
                rolesList={this.props.rolesList}
              />
            )}
          </div>
        ) : (
          <div className="row">
            <div className="col-md-12">
              <Cards
                cardHeaderText={'User not found'}
                cardHeaderButton={false}
                disabled={this.props.disableEditBtn}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  render() {
    const {
      dashboardUrl,
      dashboardClickHandler,
      permissionsList,
      userDetailError,
    } = this.props;
    const { alert } = this.state;

    return (
      <div>
        <PageHeader pageTitle="User Profile" button="" />
        <div className="container">
          <div className="col-md-12">
            Back to:{' '}
            <LinkRWD
              text="Dashboard"
              href={dashboardUrl}
              clickHandler={dashboardClickHandler}
            />
            &nbsp;&gt;&nbsp;
            <Link to="/">User List</Link>
            {this.showAlert(alert, userDetailError)}
            {this.emailSent()}
          </div>
          {this.renderCards(permissionsList)}
        </div>
      </div>
    );
  }
}

UserDetail.propTypes = {
  details: PropTypes.object,
  dashboardUrl: PropTypes.string,
  dashboardClickHandler: PropTypes.func,
  permissionsList: PropTypes.array,
  actions: PropTypes.object.isRequired,
  userDetailError: PropTypes.object,
  resendEmailStatus: PropTypes.string,
  disableResendEmailButton: PropTypes.bool,
  disableEditBtn: PropTypes.bool,
  XHRStatus: PropTypes.string,
  possibleRoles: PropTypes.array,
  rolesList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  officesList: PropTypes.arrayOf(
    PropTypes.shape({
      office_name: PropTypes.string.isRequired,
      office_id: PropTypes.string.isRequired,
    })
  ),
};

UserDetail.defaultProps = {
  dashboardUrl: '/',
  dashboardClickHandler: () => {},
};
