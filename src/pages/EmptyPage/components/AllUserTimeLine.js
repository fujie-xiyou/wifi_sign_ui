import React, {Component} from 'react'
import { Col, Icon, Row } from 'antd';
import TimeLine from '@/pages/EmptyPage/components/TimeLine';

class AllUserTimeLine extends Component{
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
      this.props.users.map((user, index) =>
        <Row key={user.id.toString()} type={'flex'} align={'middle'} gutter={[16, 32]}>
          <Col style={{textAlign: 'center'}} span={2}>
            {this.getIcon(index)}
            &nbsp;
            {user.name}
          </Col>
          <Col span={17}>
            <TimeLine segments={user.onOffLine}/>
          </Col>
          <Col span={3}>{user.allTimeString}</Col>
        </Row>
      )
    )
  }
}
export default AllUserTimeLine
