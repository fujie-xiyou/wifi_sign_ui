import React, { Component } from 'react'
import { host } from './components/Config'

import AllUserTimeLine from '@/pages/EmptyPage/components/AllUserTimeLine';
import HoursLine from '@/pages/EmptyPage/components/HoursLine';

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      result: {
        users: [
          {
            id: '',
            name: '',
            onOffLine: [
              {
                onLine: 0,
                offLine: 0
              }
            ],
            allTimeString: ''
          }
        ]
      }
    };
  }

  componentDidMount() {
    fetch(host + '/FindSomeday?date=20191208')
      .then(resp => resp.json())
      .then(
        jsonResp => {
          if (jsonResp.success) {
            this.setState({
              result: jsonResp.result
            })
          }
        },
        error => {
          console.log('error', error)
        }
      )

  }
  render() {

    const hours = [8, 10, 12, 14, 16, 18, 20, 22];

    return (
      <div>
        <HoursLine hours={hours} leftColWidth={2} colWidth={2}/>
        <AllUserTimeLine users={this.state.result.users}/>
      </div>
    )
  }
}

export default UserDetail
