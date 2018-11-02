/**
 * 依赖脚本上传
 */
import { BehaviorSubject } from 'rxjs'
import { taskBuilder } from 'store'

const uploadSubject$ = new BehaviorSubject(null)
uploadSubject$.subscribe(file => {
  file && taskBuilder.uploadDep(file)
})

export default {
  onUpload: file => {
    uploadSubject$.next(file)
  },
}