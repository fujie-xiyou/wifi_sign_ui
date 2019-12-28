import React, { Component } from 'react';
import Select from 'antd/es/select';
import { Divider } from 'antd';
import LastMonthTimeLine from '@/pages/LastMonth/components/LastMonthTimeLine';

class LastMonth extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    fetch('/all/onOffShow')
      .then(resp => resp.json())
      .then(jsonResp => {
        if (jsonResp.success) {
          this.setState({
            users: jsonResp.result
              .sort((user1, user2) => user2['department'] - user1['department']) // 按照年级排序
          })
        } else {
          console.log('请求失败', jsonResp.message)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { Option } = Select;
    return (
      <div>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="选择成员"
          optionFilterProp="children"
          onChange={(value) => {
            this.setState({selectId: value})
          }}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
          }
        >
          {
            this.state.users.map((user) =>
              <Option key={user.id} value={user.id}>{user.name}</Option>
            )
          }
        </Select>
        <Divider/>
        {this.state.selectId && <LastMonthTimeLine id={this.state.selectId}/>}
      </div>
    )
  }
}

export default LastMonth

