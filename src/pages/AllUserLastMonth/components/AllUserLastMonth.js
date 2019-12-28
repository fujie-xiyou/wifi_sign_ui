import React, { Component } from 'react';
import Select from 'antd/es/select';
import { Divider } from 'antd';
import AllUserLastMonthTimeLine from '@/pages/AllUserLastMonth/components/AllUserLastMonthTimeLine';
import { connect } from 'dva';

class AllUserLastMonth extends Component {
  state = {};
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'timeline/getOnOffShow',
    });
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
          filterOption={(input, option) =>
            option.props.children.toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
          }
        >
          {
            this.props.onOffShow &&
            this.props.onOffShow.map((user) =>
              <Option key={user.id} value={user.id}>{user.name}</Option>
            )
          }
        </Select>
        <Divider/>
        {this.state.selectId && <AllUserLastMonthTimeLine id={this.state.selectId}/>}
      </div>
    )
  }
}
export default connect(({ timeline }) => ({
  onOffShow: timeline.onOffShow
}))(AllUserLastMonth);

