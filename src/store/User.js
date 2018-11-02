import { observable, action } from 'mobx'

class User {
  @observable
  id = ''
  @observable
  name = ''
  @observable
  balance = 0

  /**
   * 设置用户信息
   * @method set
   */
  @action
  set(user) {
    this.id = user.id
    this.name = user.name
    this.balance = user.balance
  }
}

export default User
