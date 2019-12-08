import React, {Component} from 'react';
import { Col, Row } from 'antd';

class HoursLine extends Component{

  render() {
    return(
      <div>
        <Row type={'flex'} align={'middle'} >
          <Col span={this.props.leftColWidth}/>
          {
            this.props.hours.map((hour) =>
              <Col style={{textAlign: 'center'}} span={this.props.colWidth}>
                {hour.toString() + ':00'}
              </Col>
            )
          }
        </Row>
        <Row type={'flex'} align={'middle'}>
          <Col span={this.props.leftColWidth}/>
          {
            this.props.hours.map((hour) =>
              <Col style={{textAlign: 'center',
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
