import { BehaviorSubject } from 'rxjs'
import { taskBuilder } from 'store'

const uploadSubject$ = new BehaviorSubject(null)
uploadSubject$.subscribe(file => {
  file && taskBuilder.uploadFile(file)
})

export const onUploadFile = file => {
  uploadSubject$.next(file)
}
