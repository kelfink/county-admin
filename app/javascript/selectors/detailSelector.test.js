import {
  selectDetailRecords,
  permissionsList,
  rolesList,
  checkEditDisable,
  fetchingStatus,
  selectUserDetailObject,
  possibleRoles,
} from './detailSelector';

describe('selectors', () => {
  describe('#selectUserDetailObject', () => {
    it('selects the user detail object when records exists', () => {
      const state = {
        fetchDetails: {
          details: {
            records: {
              editable: true,
              roles: ['SomeRole'],
              user: {
                county_name: 'first',
                enabled: true,
                id: '12',
                name: 'third',
              },
            },
          },
        },
      };
      expect(selectUserDetailObject(state)).toEqual({
        editable: true,
        roles: ['SomeRole'],
        user: { county_name: 'first', enabled: true, id: '12', name: 'third' },
      });
    });

    it('selects the user detail object when fetchDetails does not exist', () => {
      const state = {};
      expect(selectUserDetailObject(state)).toEqual(null);
    });

    it('selects the user detail object when fetchDetails exist', () => {
      const state = {
        fetchDetails: {},
      };
      expect(selectUserDetailObject(state)).toEqual(null);
    });

    it('selects the user detail object when details are empty', () => {
      const state = {
        fetchDetails: {
          details: {},
        },
      };
      expect(selectUserDetailObject(state)).toEqual(undefined);
    });
  });

  describe('#selectDetailRecords', () => {
    it('selects the user detail records when enabled is true', () => {
      const state = {
        fetchDetails: {
          details: {
            records: {
              user: {
                county_name: 'first',
                enabled: true,
              },
            },
          },
        },
      };
      expect(selectDetailRecords(state)).toEqual({
        county_name: 'first',
        enabled: true,
      });
    });

    it('selects the user detail records when enabled is false', () => {
      const state = {
        fetchDetails: {
          details: {
            records: {
              user: {
                enabled: false,
                name: 'third',
              },
            },
          },
        },
      };
      expect(selectDetailRecords(state)).toEqual({
        enabled: false,
        name: 'third',
      });
    });

    it('selects the user detail records when enabled is some other value', () => {
      const state = {
        fetchDetails: {
          details: {
            records: {
              user: {
                enabled: 'Not a boolean Value',
                id: '12',
              },
            },
          },
        },
      };
      expect(selectDetailRecords(state)).toEqual({
        enabled: 'Not a boolean Value',
        id: '12',
      });
    });

    it('returns empty when fetchDetails does not exit', () => {
      const state = {};
      expect(selectDetailRecords(state)).toEqual({});
    });
  });

  describe('#permissionsList', () => {
    it('selects the permissions when available', () => {
      const expectedValue = [
        { name: 'foo-name', description: 'foo-desc' },
        { name: 'bar-name', description: 'bar-desc' },
      ];
      const state = {
        fetchPermissions: {
          permissions: {
            XHRStatus: 'ready',
            permissions: expectedValue,
          },
        },
      };
      expect(permissionsList(state)).toEqual(expectedValue);
    });

    it('returns empty array when permissions are not available', () => {
      const state = {
        fetchPermissions: {},
      };
      expect(permissionsList(state)).toEqual([]);
    });
  });

  describe('#rolesList', () => {
    it('selects the roles when available', () => {
      const expectedValue = [
        { id: 'foo-id', name: 'foo-name' },
        { id: 'bar-id', name: 'bar-name' },
      ];
      const state = {
        fetchRoles: {
          roles: expectedValue,
        },
      };
      expect(rolesList(state)).toEqual(expectedValue);
    });

    it('returns empty array when fetchRoles object is empty', () => {
      const state = {
        fetchRoles: {},
      };
      expect(rolesList(state)).toEqual([]);
    });

    it('returns empty array when roles is an empty array', () => {
      const state = { fetchRoles: { roles: [] } };
      expect(rolesList(state)).toEqual([]);
    });
  });

  describe('#possibleRoles', () => {
    it('selects the roles when available', () => {
      const state = {
        fetchDetails: {
          details: {
            XHRStatus: 'ready',
            records: {
              editable: false,
              possible_roles: ['role1', 'role2'],
              user: {},
            },
          },
        },
      };
      expect(possibleRoles(state)).toEqual(['role1', 'role2']);
    });

    it('returns empty array when roles are not available', () => {
      const state = {
        fetchDetails: {},
      };
      expect(possibleRoles(state)).toEqual([]);
    });
  });

  describe('#checkEditDisable', () => {
    const getFetchDetailEditableState = editable => {
      return {
        fetchDetails: {
          details: {
            XHRStatus: 'ready',
            records: {
              editable: editable,
              user: {},
            },
          },
        },
      };
    };
    it('return true when editable is false', () => {
      const state = getFetchDetailEditableState(false);
      expect(checkEditDisable(state)).toEqual(true);
    });

    it('return false if editable is true', () => {
      const state = getFetchDetailEditableState(true);
      expect(checkEditDisable(state)).toEqual(false);
    });

    it('return true if editable is null', () => {
      const state = getFetchDetailEditableState(null);
      expect(checkEditDisable(state)).toEqual(true);
    });

    it('return true if editable is undefined ', () => {
      const state = getFetchDetailEditableState(undefined);
      expect(checkEditDisable(state)).toEqual(true);
    });
  });

  describe('#fetchingStatus', () => {
    it('return the value of the details XHR status', () => {
      const state = {
        fetchDetails: {
          details: { XHRStatus: 'ready' },
        },
      };
      expect(fetchingStatus(state)).toEqual('ready');
    });
  });
});
