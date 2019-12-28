import React, { Component } from 'react'
import { Col, Icon, Row } from 'antd';
import TimeLine from '@/pages/DayOnlineDetails/components/TimeLine';
import HoursLine from '@/pages/DayOnlineDetails/components/HoursLine';
import { connect } from 'dva';
import LastMonthTimeLines from '@/components/LastMonthTimeLines/LastMonthTimeLines';

class AllUserLastMonthTimeLine extends Component {

  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch({
      type: 'timeline/getAllUserLastMonth',
      payload: {
        id
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.id !== this.props.id) {
      const { dispatch, id } = this.props;
      dispatch({
        type: 'timeline/getAllUserLastMonth',
        payload: {
          id
        }
      });
    }
  }

  render() {
    return (
      this.props.allUserLastMonth.timeSingles &&
      <LastMonthTimeLines timeSingles={this.props.allUserLastMonth.timeSingles}/>
      || null
    )
  }
}

export default connect(({ timeline }) => ({
  allUserLastMonth: timeline.allUserLastMonth
}))(AllUserLastMonthTimeLine);
