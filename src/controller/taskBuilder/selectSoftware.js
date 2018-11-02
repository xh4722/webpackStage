/**
 * 软件选择
 */
import { BehaviorSubject } from 'rxjs'
import { taskBuilder } from 'store'

const selectSubject$ = new BehaviorSubject('')
selectSubject$.subscribe(software => {
  software && taskBuilder.selectSoftware(software)
})

export default {
  onSelect: software => {
    selectSubject$.next(software)
  },
}
