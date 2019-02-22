import React from 'react'
import { shallow, mount } from 'enzyme'
import ChangeLog, { sortByName, sortByType, viewHeightSize } from './ChangeLog'

describe('ChangeLog', () => {
  let wrapper
  const events = [
    {
      event: { admin_name: 'Dorfler, Marvin', admin_role: 'Office Admin', user_name: 'User Name', user_roles: 'USER-ROLE' },
      event_type: 'B',
      user_login: 'wrong2',
      timestamp: '2019-01-03 14:22:22',
    },
    {
      event: { admin_name: 'Mosely, Alonso', admin_role: 'State Admin', user_name: 'User Name2', user_roles: 'USER-ROLE2' },
      event_type: 'C',
      user_login: 'wrong1',
      timestamp: '2019-01-04 14:22:00',
    },
    {
      event: { admin_name: 'Mosely, Alonso', admin_role: 'State Admin', user_name: 'User Name3', user_roles: 'USER-ROLE3' },
      event_type: 'C',
      user_login: 'wrong1',
      timestamp: '2019-01-04 14:21:00',
    },
    {
      event: { admin_name: 'Walsh, Jack', admin_role: 'County Admin', user_name: 'User Name4', user_roles: 'USER-ROLE4' },
      event_type: 'A',
      user_login: 'wrong3',
      timestamp: '2019-01-02 14:22:22',
    },
  ]
  beforeEach(() => {
    wrapper = shallow(<ChangeLog auditEvents={events} userDetails={{}} adminDetails={{}} userOfficeName="" adminOfficeName="" />)
  })

  it('renders the Components ', () => {
    expect(wrapper.find('Rolodex').exists()).toBe(true)
    expect(wrapper.find('Card').exists()).toBe(true)
    expect(wrapper.find('CardHeader').exists()).toBe(true)
    expect(wrapper.find('CardTitle').exists()).toBe(true)
    expect(wrapper.find('CardBody').exists()).toBe(true)
  })

  it('renders the header and 3 fake changelog rows', () => {
    expect(
      wrapper
        .find('CardBody')
        .dive()
        .find('DataGrid')
        .dive()
        .find('ReactTable')
        .dive()
        .find('TableComponent')
        .dive()
        .find('TrComponent').length
    ).toEqual(5)
  })

  it('renders the date field correctly sorted by latest first', () => {
    const mounted = mount(
      <ChangeLog auditEvents={events} userDetails={''} adminDetails={''} userOfficeName="" adminOfficeName="" />
    )
    const trs = mounted.find('TrComponent')
    expect(
      trs
        .at(1)
        .children()
        .first()
        .children()
        .first()
        .text()
    ).toEqual('January 4, 2019 02:22 PM')
  })

  it('renders the admin name field with formatted display of admin role', () => {
    const mounted = mount(
      <ChangeLog auditEvents={events} userDetails={''} adminDetails={''} userOfficeName="" adminOfficeName="" isListView={true} />
    )
    const trs = mounted.find('TrComponent')
    const madeToHeader = trs
      .at(0)
      .childAt(0)
      .childAt(1)
    expect(madeToHeader.text()).toEqual('Made To')

    const madeByHeader = trs
      .at(0)
      .childAt(0)
      .childAt(2)
    expect(madeByHeader.text()).toEqual('Made By')

    expect(trs.at(1).text()).toEqual(
      ['January 4, 2019 02:22 PM', 'User Name2 (USER-ROLE2)', 'Mosely, Alonso (State Admin)', 'C', 'view'].join('')
    )
    expect(trs.at(2).text()).toEqual(
      ['January 4, 2019 02:21 PM', 'User Name3 (USER-ROLE3)', 'Mosely, Alonso (State Admin)', 'C', 'view'].join('')
    )
    expect(trs.at(3).text()).toEqual(
      ['January 3, 2019 02:22 PM', 'User Name (USER-ROLE)', 'Dorfler, Marvin (Office Admin)', 'B', 'view'].join('')
    )
    expect(trs.at(4).text()).toEqual(
      ['January 2, 2019 02:22 PM', 'User Name4 (USER-ROLE4)', 'Walsh, Jack (County Admin)', 'A', 'view'].join('')
    )
    expect(
      trs
        .at(1)
        .childAt(0)
        .childAt(1)
        .text()
    ).toEqual('User Name2 (USER-ROLE2)')
    expect(
      trs
        .at(2)
        .childAt(0)
        .childAt(1)
        .text()
    ).toEqual('User Name3 (USER-ROLE3)')
    expect(
      trs
        .at(3)
        .childAt(0)
        .childAt(1)
        .text()
    ).toEqual('User Name (USER-ROLE)')
    expect(
      trs
        .at(4)
        .childAt(0)
        .childAt(1)
        .text()
    ).toEqual('User Name4 (USER-ROLE4)')

    expect(
      trs
        .at(1)
        .childAt(0)
        .childAt(2)
        .text()
    ).toEqual('Mosely, Alonso (State Admin)')
    expect(
      trs
        .at(2)
        .childAt(0)
        .childAt(2)
        .text()
    ).toEqual('Mosely, Alonso (State Admin)')
    expect(
      trs
        .at(3)
        .childAt(0)
        .childAt(2)
        .text()
    ).toEqual('Dorfler, Marvin (Office Admin)')
    expect(
      trs
        .at(4)
        .childAt(0)
        .childAt(2)
        .text()
    ).toEqual('Walsh, Jack (County Admin)')

    madeByHeader.simulate('click') // sort by Made By

    expect(trs.at(1).text()).toEqual(
      ['January 3, 2019 02:22 PM', 'User Name (USER-ROLE)', 'Dorfler, Marvin (Office Admin)', 'B', 'view'].join('')
    )
    expect(trs.at(2).text()).toEqual(
      ['January 4, 2019 02:22 PM', 'User Name2 (USER-ROLE2)', 'Mosely, Alonso (State Admin)', 'C', 'view'].join('')
    )
    expect(trs.at(3).text()).toEqual(
      ['January 4, 2019 02:21 PM', 'User Name3 (USER-ROLE3)', 'Mosely, Alonso (State Admin)', 'C', 'view'].join('')
    )
    expect(trs.at(4).text()).toEqual(
      ['January 2, 2019 02:22 PM', 'User Name4 (USER-ROLE4)', 'Walsh, Jack (County Admin)', 'A', 'view'].join('')
    )
  })

  describe('sortByName', () => {
    it('sorts by event admin_name', () => {
      const rowA = { event: { admin_name: 'apple' } }
      const rowB = { event: { admin_name: 'banana' } }
      expect(sortByName(rowA, rowB)).toEqual(-1)
      expect(sortByName(rowB, rowA)).toEqual(1)
    })

    it('breaks a tie with timestamp', () => {
      const rowA = {
        event: { admin_name: 'apple' },
        timestamp: '2050-01-01 12:00:00',
      }
      const rowB = {
        event: { admin_name: 'apple' },
        timestamp: '2000-01-01 12:00:00',
      }
      expect(rowA.event.admin_name).toEqual('apple')
      expect(rowB.event.admin_name).toEqual('apple')
      expect(sortByName(rowA, rowB, false)).toEqual(-1)
      expect(sortByName(rowB, rowA, false)).toEqual(1)
      expect(sortByName(rowA, rowB, true)).toEqual(1)
      expect(sortByName(rowB, rowA, true)).toEqual(-1)
    })
  })

  describe('sortByType', () => {
    it('sorts by event event_type', () => {
      const rowA = { event: { admin_name: 'apple' }, event_type: 'X' }
      const rowB = { event: { admin_name: 'apple' }, event_type: 'Y' }
      expect(sortByType(rowA, rowB)).toEqual(-1)
      expect(sortByType(rowB, rowA)).toEqual(1)
    })

    it('breaks a tie with timestamp and timestamp is always sorted descending', () => {
      const rowA = {
        event: { admin_name: 'banana' },
        event_type: 'X',
        timestamp: '2050-01-01 12:00:00',
      }
      const rowB = {
        event: { admin_name: 'apple' },
        event_type: 'X',
        timestamp: '2000-01-01 12:00:00',
      }
      expect(rowA.event.admin_name).toEqual('banana')
      expect(rowB.event.admin_name).toEqual('apple')
      expect(sortByType(rowA, rowB, false)).toEqual(-1)
      expect(sortByType(rowB, rowA, false)).toEqual(1)

      expect(sortByType(rowA, rowB, true)).toEqual(1)
      expect(sortByType(rowB, rowA, true)).toEqual(-1)
    })
  })

  describe('#viewHeightSize', () => {
    it('returns size based on prop value', () => {
      expect(viewHeightSize(true)).toEqual('1200px')
      expect(viewHeightSize(false)).toEqual('500px')
      expect(viewHeightSize('')).toEqual('500px')
      expect(viewHeightSize(null)).toEqual('500px')
      expect(viewHeightSize(undefined)).toEqual('500px')
    })
  })
})
