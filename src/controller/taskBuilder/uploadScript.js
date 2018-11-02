/**
 * 文件上传
 */
import { BehaviorSubject } from 'rxjs'
import { taskBuilder } from 'store'

const uploadSubject$ = new BehaviorSubject(null)
uploadSubject$.subscribe(file => {
  file && taskBuilder.uploadScript(file)
})

export default {
  onUpload: file => {
    uploadSubject$.next(file)
  },
}
