import React, { Component } from 'react'
import { Col, Icon, Row } from 'antd';
import TimeLine from '@/pages/DayOnlineDetails/components/TimeLine';
import HoursLine from '@/pages/DayOnlineDetails/components/HoursLine';
import { connect } from 'dva';

class AllUserTimeLine extends Component {

  componentDidMount() {
    const { dispatch, date } = this.props;
    dispatch({
      type: 'timeline/getSomeday',
      payload: {
        date
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.date !== this.props.date){
      const { dispatch, date } = this.props;
      dispatch({
        type: 'timeline/getSomeday',
        payload: {
          date
        }
      });

    }
    if(prevProps.somedayDetails !== this.props.somedayDetails){
      this.props.setCheck(
        this.props.somedayDetails.checkInPeople,
        this.props.somedayDetails.noCheckInPeople,
        this.props.somedayDetails.noCheckInUsers)
    }

  }

  getIcon(index) {
    if (index === 0) {
      return <Icon type="crown" theme="twoTone" twoToneColor="#CD7F32"/>;
    } else if (index === 1) {
      return <Icon type="sketch"/>
    } else if (index === 2) {
      return <Icon type="trophy" theme="twoTone" twoToneColor="#B5A642"/>;
    }
    return null;
  }

  render() {
    return (
      <div>
        <HoursLine leftColWidth={2} colWidth={2}/>

        {
          this.props.somedayDetails.checkInUsers &&
          this.props.somedayDetails.checkInUsers.map((user, index) =>
            <Row key={user.id.toString()} type={'flex'} align={'middle'} gutter={[16, 32]}>
              <Col style={{ textAlign: 'center' }} span={2}>
                {this.getIcon(index)}
                &nbsp;
                {user.name}
              </Col>
              <Col span={17}>
                <TimeLine userName={user.name} segments={user.onOffLine}/>
              </Col>
              <Col span={3}>{user.allTimeString}</Col>
            </Row>
          )
        }
      </div>

    )
  }
}

export default connect(({ timeline }) => ({
  somedayDetails: timeline.somedayDetails
}))(AllUserTimeLine);
