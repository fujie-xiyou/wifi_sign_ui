import React, { Component } from 'react'
import Rectangle from './Rectangle'
import OnLineSegment from '@/pages/DayOnlineDetails/components/OnLineSegment';

class TimeLine extends Component {

  render() {
    return (
      <svg width={'100%'} height={'10px'}>
        <rect width={'100%'} fill={'Gainsboro'}/>
        {
          this.props.segments.map((segment) =>
            <OnLineSegment key={segment.onLine.toString()}
                           onLine={segment.onLine}
                           offLine={segment.offLine}
                           userName={this.props.userName}
            />
          )
        }
      </svg>
    )
  }
}

export default TimeLine
