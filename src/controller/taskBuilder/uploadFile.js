/**
 * 文件上传
 */
import { BehaviorSubject } from 'rxjs'
import { taskBuilder } from 'store'

const uploadSubject$ = new BehaviorSubject(null)
uploadSubject$.subscribe(file => {
  file && taskBuilder.uploadFile(file)
})

export default {
  /**
   * 上传文件
   * @method onUpload
   */
  onUpload: file => {
    uploadSubject$.next(file)
  },
}
