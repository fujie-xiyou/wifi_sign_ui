import React, { Component } from 'react'
import { Col, Icon, Row } from 'antd';
import TimeLine from '@/pages/DayOnlineDetails/components/TimeLine';
import HoursLine from '@/pages/DayOnlineDetails/components/HoursLine';
import { connect } from 'dva';
import LastMonthTimeLines from '@/components/LastMonthTimeLines/LastMonthTimeLines';

class MyLastMonthTimeLine extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'timeline/getMyLastMonth',
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.id !== this.props.id) {
      const { dispatch } = this.props;
      dispatch({
        type: 'timeline/getMyLastMonth',
      });
    }
  }

  render() {
    return (
      this.props.myLastMonth &&
      <LastMonthTimeLines timeSingles={this.props.myLastMonth.timeSingles}/>
      || null
    )
  }
}

export default connect(({ timeline }) => ({
  myLastMonth: timeline.myLastMonth
}))(MyLastMonthTimeLine);
