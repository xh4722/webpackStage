import React from 'react'
import customConnect from 'utils/connect/'

@customConnect(({ member }) => ({ member }))
export default class Member extends React.Component {
  componentWillMount() {
    this.props.member.getMember({
      mobile: '1234567890123',
    })
  }

  render() {
    let { member } = this.props
    let memberData = member.data

    return (
      <div>
        <div>member</div>
        <div>
          会员信息：
          {member.isFetching ? '获取中...' : '获取完成'}
        </div>
        <div>
          memberInfo:
          {memberData ? memberData.name : ''}
        </div>
      </div>
    )
  }
}
