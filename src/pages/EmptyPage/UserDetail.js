import React, { Component } from 'react'
import { host } from './components/Config'
import { Row, Col, Icon, DatePicker } from 'antd'

import TimeLine from './components/TimeLine';

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      result: {
        userUtils: [
          {
            id: '',
            name: '',
            onOffLineUtils: [],
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
  getIcon(index){
    if(index === 0){
      return <Icon type="crown" theme="twoTone" twoToneColor="#CD7F32"/>;
    }
    else if(index === 1){
      return <Icon type="sketch"/>
    }
    else if(index === 2){
      return <Icon type="trophy" theme="twoTone" twoToneColor="#B5A642"/>;
    }
    return null;
  }
  render() {

    let userUtils = this.state.result.userUtils;
    const hours = [8, 10, 12, 14, 16, 18, 20, 22];

    return (
      <div>
        <Row type={'flex'} align={'middle'} >
          <Col span={2}/>
          {
            hours.map((hour) =>
              <Col style={{textAlign: 'center'}} span={2}>
                {hour.toString() + ':00'}
              </Col>
            )
          }
        </Row>
        <Row type={'flex'} align={'middle'}>
          <Col span={2}/>
          {
            hours.map((hour) =>
              <Col style={{textAlign: 'center',
                borderStyle: 'none solid none solid',
                borderWidth: '1px',
                borderColor: 'Gainsboro'
              }} span={2}>
                |
              </Col>
            )
          }
        </Row>
        {
          userUtils.map((user, index) =>
            <Row key={user.id.toString()} type={'flex'} align={'middle'} gutter={[16, 32]}>
              <Col style={{textAlign: 'center'}} span={2}>
                {this.getIcon(index)}
                &nbsp;
                {user.name}
              </Col>
              <Col span={17}>
                <TimeLine segments={user.onOffLineUtils}/>
              </Col>
              <Col span={3}>{user.allTimeString}</Col>
            </Row>
          )
        }
      </div>
    )
  }
}

export default UserDetail
