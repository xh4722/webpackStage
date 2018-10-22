import { MemberAction } from 'actions'
import BaseCtrl from './BaseCtrl'

/**
 * 会员模块控制器
 * @class MemberCtrl
 */
class MemberCtrl extends BaseCtrl {
  constructor(props) {
    super(props)
  }

  /**
   * 查询会员
   * @param {object} args
   */
  getMember(args) {
    // 派发 action：会员查询
    this.dispatch(MemberAction.get())

    // 处理异步逻辑
    setTimeout(() => {
      let data = {
        name: '李雷',
        mobile: args.mobile,
        vipInfo: {
          level: 1,
        },
      }

      // 派发 action：会员查询成功
      this.dispatch(MemberAction.getSuccess(data))
    }, 2000)
  }

  setName(name) {
    this.dispatch(MemberAction.setName(name))
  }
}

const test1 = new MemberCtrl({})
const test2 = new MemberCtrl({})
console.log(test1.hasOwnProperty('getMember'))
console.log(test1.getMember === test2.getMember)

export default MemberCtrl
