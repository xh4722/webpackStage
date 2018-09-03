import React from 'react'
import { connect } from 'react-redux'
import customConnect from 'utils/connect/'

import { MemberAction } from 'actions'

const mapStateToProps = state => ({
  member: state.member,
})

const mapDispatchToProps = dispatch => ({
  getMember: args => dispatch(MemberAction.getMember(args)),
})

//@connect(mapStateToProps, mapDispatchToProps)
@customConnect(({ member }) => ({ member }))
export default class Member extends React.Component {
  componentWillMount() {
    console.log(this.props.member.isFetching)
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
