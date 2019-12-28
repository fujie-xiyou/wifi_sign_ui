import React, { Component } from 'react'
import { Col, Row } from 'antd';
import TimeLine from '@/pages/DayOnlineDetails/components/TimeLine';
import HoursLine from '@/pages/DayOnlineDetails/components/HoursLine';

class LastMonthTimeLines extends Component {

  render() {
    return (
      <div>
        <HoursLine leftColWidth={2} colWidth={2}/>
        {
          this.props.timeSingles &&
          this.props.timeSingles.map((single) =>
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

export default LastMonthTimeLines
