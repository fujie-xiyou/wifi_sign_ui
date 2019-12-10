import React, { Component } from 'react'

class Rectangle extends Component {

  render() {
    return (
      <rect id={'rect'} x={this.props.x} width={this.props.width} height="100%"
            fill={this.props.fill} rx="0" ry="0"/>
    )
  }

}

export default Rectangle;
