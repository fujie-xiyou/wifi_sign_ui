import React, {Component} from 'react'
import { Col, Icon, Row } from 'antd';
import TimeLine from '@/pages/DayOnlineDetails/components/TimeLine';
import HoursLine from '@/pages/DayOnlineDetails/components/HoursLine';
import { connect } from 'dva';

class LastMonthTimeLine extends Component{

  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch({
      type: 'timeline/getLastMonth',
      payload: {
        id
      }
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.id !== this.props.id) {
      const { dispatch, id } = this.props;
      dispatch({
        type: 'timeline/getLastMonth',
        payload: {
          id
        }
      });
    }
  }

  render() {
    return(
      <div>
        <HoursLine leftColWidth={2} colWidth={2}/>
        {
          this.props.lastMonth.timeSingles &&
          this.props.lastMonth.timeSingles.map((single) =>
            <Row key={single.date} type={'flex'} align={'middle'} gutter={[16, 32]}>
              <Col style={{ textAlign: 'center' }} span={2}>
                {single.date}
              </Col>
              <Col span={17}>
                <TimeLine userName={single.date} segments={single.onOffLines}/>
              </Col>
              <Col span={3}>{single.allTimeString}</Col>
            </Row>
          )
        }
      </div>

    )
  }
}
export default connect(({ timeline }) => ({
  lastMonth: timeline.lastMonth
}))(LastMonthTimeLine);
