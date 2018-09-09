import { MemberAction } from 'actions'
import BaseCtrl from './BaseCtrl'

/**
 * 会员模块控制器
 * @class MemberCtrl
 */
class MemberCtrl extends BaseCtrl {
  constructor(props, dispatch) {
    super(props)

    this.dispatch = dispatch
  }

  /**
   * 查询会员
   * @param {object} args
   */
  getMember(args) {
    // 派发 action：会员查询
    this.dispatch(MemberAction.getMember())

    // 处理异步逻辑
    setTimeout(() => {
      let data = {
        name: '李雷',
        mobile: args.mobile,
      }

      // 派发 action：会员查询成功
      this.dispatch(MemberAction.getMemberSuccess(data))
    }, 2000)
  }
}

export default MemberCtrl
