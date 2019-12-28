import React, {Component} from 'react'
import { Col, Icon, Row } from 'antd';
import TimeLine from '@/pages/DayOnlineDetails/components/TimeLine';
import HoursLine from '@/pages/DayOnlineDetails/components/HoursLine';

class LastMonthTimeLine extends Component{
  constructor(props){
    super(props);
    this.state = {
      result: {
        name: '',
        department: 0,
        timeSingles:[
          {
            date: '',
            allTimeString: '',
            onOffLines: [
              {
                onLine: 0,
                offLine: 0
              }
            ],
          }
        ],
        checkInPeople: 0,
        noCheckInPeople: 0
      }
    }
  }
  updateAllUserTimeLine(){
    fetch('/admin/findSomeBody?id=' + this.props.id)
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

  componentDidMount() {
    this.updateAllUserTimeLine();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.id !== this.props.id) {
      this.updateAllUserTimeLine();
    }
  }

  render() {
    return(
      <div>
        <HoursLine leftColWidth={2} colWidth={2}/>
        {
          this.state.result.timeSingles.map((single) =>
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
export default LastMonthTimeLine
