import React, {Component} from 'react';
import { Col, Row } from 'antd';

class HoursLine extends Component{

  render() {
    const hours = [8, 10, 12, 14, 16, 18, 20, 22];

    return(
      <div>
        <Row type={'flex'} align={'middle'} >
          <Col span={this.props.leftColWidth}/>
          {
            hours.map((hour) =>
              <Col key={hour.toString()} style={{textAlign: 'center'}} span={this.props.colWidth}>
                {hour.toString() + ':00'}
              </Col>
            )
          }
        </Row>
        <Row type={'flex'} align={'middle'}>
          <Col span={this.props.leftColWidth}/>
          {
            hours.map((hour) =>
              <Col key={hour.toString() + '-2'} style={{textAlign: 'center',
                borderStyle: 'none solid none solid',
                borderWidth: '1px',
                borderColor: 'Gainsboro'
              }} span={this.props.colWidth}>
                |
              </Col>
            )
          }
        </Row>
      </div>
    )
  }

}
export default HoursLine
