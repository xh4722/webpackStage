import React from 'react'
import customConnect from 'connect'

import { MemberAction } from 'actions'

import Name from './name'

const mapStateToProps = ({
  member: { isFetching, getMember, setName: setMemberName },
}) => ({
  isFetching,
  getMember,
  setMemberName,
})
const mapDispatchToProps = dispatch => ({
  // setMemberName: name => {
  //   dispatch({
  //     type: MemberAction.setName(name),
  //   })
  // },
})
@customConnect(mapStateToProps, mapDispatchToProps)
export default class Member extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.setMemberName === this.props.setMemberName)
  }

  /**
   * 获取会员函数
   * @method getMember
   */
  getMember = () => {
    this.props.getMember({
      mobile: '1234567890123',
    })
  }

  /**
   * 修改会员名称
   * @method setName
   */
  setName = () => {
    this.props.setMemberName('testName')
  }

  render() {
    const { data, isFetching } = this.props

    return (
      <div>
        <div>member</div>
        <div>
          会员信息：
          {isFetching ? '获取中...' : '获取完成'}
        </div>
        <Name />
        <div>
          <button onClick={this.getMember}>获取会员信息</button>
        </div>
        <div>
          <button onClick={this.setName}>修改会员信息</button>
        </div>
      </div>
    )
  }
}
