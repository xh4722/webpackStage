import { observable, computed, action } from 'mobx'

/**
 * 任务构建器
 * @class TaskBuilder
 */
export default class TaskBuilder {
  @observable
  name = ''

  @observable
  files = []

  @observable
  entries = []

  @observable
  resource = null

  @observable
  deps = []

  @observable
  scripts = []

  /**
   * 上传文件
   * @method uploadFile
   */
  @action
  uploadFile(file) {
    this.files.push(file)
  }
}
