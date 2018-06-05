import React from 'react';
import { shallow } from 'enzyme';
import UserDetailEdit from './UserDetailEdit';

describe('UserDetailEdit', () => {
  const details = {
    id: 'id',
    first_name: 'Firstname0',
    last_name: 'Lastname0',
    county_name: 'MyCounty',
    permissions: ['x', 'y'],
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<UserDetailEdit details={details} />);
  });

  describe('when label and className props are passed', () => {
    it('renders the label inside the grid wrapper', () => {
      wrapper = shallow(<UserDetailEdit details={details} />);
      expect(wrapper.find('ShowField').length).toBe(8);
      expect(
        wrapper
          .find('ShowField')
          .at(0)
          .props().label
      ).toEqual('Full Name');
      expect(
        wrapper
          .find('ShowField')
          .at(1)
          .props().label
      ).toEqual('Office Name');
      expect(
        wrapper
          .find('ShowField')
          .at(2)
          .props().label
      ).toEqual('CWS Login');
      expect(
        wrapper
          .find('ShowField')
          .at(3)
          .props().label
      ).toEqual('Last Login');
      expect(
        wrapper
          .find('ShowField')
          .at(4)
          .props().label
      ).toEqual('Email');
      expect(
        wrapper
          .find('ShowField')
          .at(5)
          .props().label
      ).toEqual('Office Phone Number');
      expect(
        wrapper
          .find('ShowField')
          .at(6)
          .props().label
      ).toEqual('Start Date');
      expect(
        wrapper
          .find('ShowField')
          .at(7)
          .props().label
      ).toEqual('End Date');
      expect(wrapper.find('[label="Status"]').exists()).toBe(true);
      expect(wrapper.find('[label="Assigned Roles"]').exists()).toBe(true);
    });
  });
});
