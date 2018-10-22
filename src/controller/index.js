import MemberCtrl from './MemberCtrl'
import singleInstance from './utils/singleInstanceWrapper'

export const member = singleInstance(MemberCtrl)

export default {
  member,
}
