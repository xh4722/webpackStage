import { createActions } from 'redux-actions'

const prefix = 'MEMBER'

export default createActions('GET', 'GET_SUCCESS', 'GET_FAIL', 'SET_NAME', {
  prefix,
})
