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
  software = {
    name: 'Abaqus',
  }

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

  /**
   * 选择软件
   * @method selectSoftware
   */
  @action
  selectSoftware(software) {
    this.software = software
  }

  /**
   * 上传依赖脚本
   * @method uploadDep
   */
  @action
  uploadDep(dep) {
    this.deps.push(dep)
  }

  /**
   * 上传脚本文件
   * @method uploadScript
   */
  @action
  uploadScript(script) {
    this.scripts.push(script)
  }
}
