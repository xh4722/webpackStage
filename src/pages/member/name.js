import React, { PureComponent } from 'react'
import customConnect from 'connect'

@customConnect(({ member: { data } }) => ({
  name: data ? data.name : '',
}))
export default class Name extends PureComponent {
  render() {
    return (
      <span>
        会员名称：
        {this.props.name}
      </span>
    )
  }
}
