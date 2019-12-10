import React, { Component } from 'react'
import { Popover, Icon } from 'antd'
import Rectangle from '@/pages/DayOnlineDetails/components/Rectangle';

class OnLineSegment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      onLine: 0,
      offLine: 0,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps;
  }

  render() {
    const onlineHours = Math.floor(this.state.onLine / 60);
    const onlineMin = this.state.onLine % 60;
    const offlineHours = Math.floor(this.state.offLine / 60);
    const offlineMin = this.state.offLine % 60;

    // 在线时长
    const duration = this.state.offLine - this.state.onLine;
    const durationHours = Math.floor(duration / 60);
    const durationMin = duration % 60;
    const content = (
      <div>
        上线时间：
        {onlineHours < 10 ? '0' + onlineHours : onlineHours}:{onlineMin < 10 ? '0' + onlineMin : onlineMin}
        <br/>
        下线时间：
        {offlineHours < 10 ? '0' + offlineHours : offlineHours}:{offlineMin < 10 ? '0' + offlineMin : offlineMin}
        <br/>
        在线时长：{durationHours === 0 ? '' : durationHours + '小时'}
        {durationMin}分钟
      </div>
    );
    return (
      <Popover content={content} title={this.state.userName} trigger="hover">
        <rect id={'rect'} x={(this.state.onLine - 7 * 60) / (17 * 60) * 100 + '%'}
              width={(this.state.offLine - this.state.onLine) / (17 * 60) * 100 + '%'} height="100%"
              fill={'LimeGreen'} rx="0" ry="0"/>
      </Popover>
    )
  }
}

export default OnLineSegment
