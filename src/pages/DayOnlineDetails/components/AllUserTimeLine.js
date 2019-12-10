import React, {Component} from 'react'
import { Col, Icon, Row } from 'antd';
import TimeLine from '@/pages/DayOnlineDetails/components/TimeLine';
import { host } from '@/pages/DayOnlineDetails/components/Config';
import HoursLine from '@/pages/DayOnlineDetails/components/HoursLine';

class AllUserTimeLine extends Component{
  constructor(props){
    super(props);
    this.state = {
      result: {
        checkInUsers: [
          {
            id: '',
            name: '',
            onOffLine: [
              {
                onLine: 0,
                offLine: 0
              }
            ],
            allTimeString: ''
          }
        ],
        checkInPeople: 0,
        noCheckInPeople: 0
      }
    }

  }
  updateAllUserTimeLine(){
    fetch(host + '/FindSomeday?date=' + this.props.date)
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
    if(prevProps.date !== this.props.date){
      this.updateAllUserTimeLine();
    }
    if (
      prevState.result.checkInPeople !== this.state.result.checkInPeople ||
      prevState.result.noCheckInPeople !== this.state.result.noCheckInPeople ||
      prevState.result.noCheckInUsers !== this.state.result.noCheckInUsers
    ){

      this.props.setCheck(this.state.result.checkInPeople, this.state.result.noCheckInPeople, this.state.result.noCheckInUsers)
    }
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
    return(
      <div>
        <HoursLine leftColWidth={2} colWidth={2}/>
        {
          this.state.result.checkInUsers.map((user, index) =>
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
export default AllUserTimeLine
