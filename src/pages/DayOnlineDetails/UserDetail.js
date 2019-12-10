import React, { Component } from 'react'

import AllUserTimeLine from '@/pages/DayOnlineDetails/components/AllUserTimeLine';
import { Col, DatePicker, Row, Badge, Divider, Popover, List } from 'antd'
import InfiniteScroll from 'react-infinite-scroller';
import { message, Avatar, Spin } from 'antd';
import moment from 'moment';
import { host } from '@/pages/DayOnlineDetails/components/Config';

class UserDetail extends Component {
  state = {
    checkInPeople: 0,
    noCheckInPeople: 0,
    onLinePeople: 0,
    noCheckInUsers: [],
    date: moment()
      .format('YYYYMMDD'),
  };

  componentDidMount() {
    fetch(host + '/onUserNumber')
      .then(resp => resp.json())
      .then(jsonResp => {
        this.setState({
          onLinePeople: jsonResp.result
        })
      })
  }

  render() {
    const content = (
      <List
        style={{
          maxHeight: '200px',
          overflow: 'auto'
        }}
        size="small"
        dataSource={this.state.noCheckInUsers}
        renderItem={item => <List.Item>{item.name}</List.Item>}
      />

    );
    return (
      <div>
        <Row type={'flex'} align={'middle'} justify={'start'} gutter={32}>
          <Col>
            <Row type={'flex'} align={'middle'} justify={'start'} gutter={32}>
              <Col>
                当前在线：<Badge showZero={true} count={this.state.onLinePeople}
                            style={{ backgroundColor: '#52c41a' }}/>
              </Col>
              <Col>
                今日签到：<Badge showZero={true} count={this.state.checkInPeople}
                            style={{ backgroundColor: '#2db7f5' }}/>
              </Col>
              <Col>
                今日未签：
                <Popover placement="bottomLeft" title={'未签到列表'} content={content} trigger="click">
                  <Badge count={this.state.noCheckInPeople} showZero={true}/>
                </Popover>
              </Col>
              <Col>
                选择日期：
                <DatePicker defaultValue={moment()} format={'YYYY/MM/DD'}
                            onChange={date => this.setState({ date: date.format('YYYYMMDD') })}
                            disabledDate={current => current > moment()
                              .endOf('day')}/>
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider/>
        <AllUserTimeLine
          setCheck={(checkInPeople, noCheckInPeople, noCheckInUsers) =>
            this.setState({
              checkInPeople: checkInPeople,
              noCheckInPeople: noCheckInPeople,
              noCheckInUsers: noCheckInUsers,
            })}
          date={this.state.date}/>
      </div>
    )
  }
}

export default UserDetail
