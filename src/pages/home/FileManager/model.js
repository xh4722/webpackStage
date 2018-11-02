import { observable, action } from 'mobx'

class State {
  @observable
  visible = false

  @action
  showModal = () => {
    this.visible = true
  }

  @action
  hideModal = () => {
    this.visible = false
  }
}
export default new State()
