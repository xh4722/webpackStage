import { all } from 'redux-saga/effects'

import memberSaga from './member'

export default function*() {
  yield all([...memberSaga])
}
