import React, {Component} from 'react'
import {host} from './components/Config'
import {Row, Col} from 'antd'

import TimeLine from "./components/TimeLine";

class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: []
        };
    }

    componentDidMount() {
        fetch(host + "/FindSomeday?date=20191208")
            .then(resp => resp.json())
            .then(
                jsonResp => {
                    if(jsonResp.success){
                        this.setState({
                            result: jsonResp.result
                        })
                    }
                },
                error => {
                    console.log("error", error)
                }
            )

    }

    render() {
        return (
            this.state.result.map((user) =>
                <Row key={user.id.toString()} type={"flex"} align={"middle"} gutter={[16, 32]}>
                    <Col span={1}>{user.name}</Col>
                    <Col span={20} >
                        <TimeLine segments={user.onOffLineUtils}/>
                    </Col>
                    <Col span={2}>{user.allTimeString}</Col>
                </Row>
            )
        )
    }
}

export default UserDetail
