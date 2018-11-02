import { observable, action } from 'mobx'

class UserConfig {
  @observable
  softwares = []

  /**
   * 设置用户配置信息
   * @method set
   */
  @action
  set(config) {
    this.softwares = config.softwares
  }
}

export default UserConfig
