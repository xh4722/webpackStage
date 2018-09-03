import { createActions } from 'redux-actions'

const prefix = 'MEMBER'

export default createActions(
  'GET_MEMBER',
  'GET_MEMBER_SUCCESS',
  'GET_MEMBER_FAIL',
  { prefix }
)
