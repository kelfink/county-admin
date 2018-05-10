import React from 'react';
import PropTypes from 'prop-types';
import { GlobalHeader, PageHeader, Cards } from 'react-wood-duck';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const UserList = ({ userList }) => (
  <div>
    <GlobalHeader profileName="County CWDS-Admin" profileId="profile.id" />
    <PageHeader pageTitle="Manage Users" button="" />
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Cards
            cardHeaderText="Manage Users: Sacramento"
            cardActionButtons={false}
          >
            <div className="col-md-12">
              <br />
              <BootstrapTable
                search
                searchPlaceholder="search by Last name"
                bordered={false}
                data={userList}
                striped={true}
                hover={true}
              >
                <TableHeaderColumn dataField="first_name" dataSort width="100">
                  Full Name
                </TableHeaderColumn>
                <TableHeaderColumn dataField="last_name" />
                <TableHeaderColumn dataField="status" dataSort width="150">
                  Status
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="last_login_date_time"
                  dataSort
                  width="180"
                >
                  Last Login
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="username"
                  isKey
                  dataSort
                  width="120"
                >
                  Username
                </TableHeaderColumn>
                <TableHeaderColumn dataField="end_date" dataSort width="150">
                  End date
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          </Cards>
        </div>
      </div>
    </div>
  </div>
);

UserList.propTypes = {
  name: PropTypes.string,
  userList: PropTypes.array,
};

export default UserList;
