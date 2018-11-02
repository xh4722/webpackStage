import { observable, action } from 'mobx'

// 定义组件内状态
class State {
  @observable
  list = []

  // 获取文件列表
  @action
  setList = list => {
    this.list = list
  }
}

export default new State()
