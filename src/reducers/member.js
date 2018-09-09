import { handleActions, combineActions } from 'redux-actions'
import { MemberAction } from 'actions'

let { getMember, getMemberFail, getMemberSuccess } = MemberAction

export default handleActions(
  {
    [getMember]: (state, action) => {
      return Object.assign(
        {
          isFetching: true,
        },
        {
          data: action.payload,
        }
      )
    },
    [combineActions(getMemberFail, getMemberSuccess)]: (state, action) => {
      return Object.assign(
        {
          isFetching: false,
        },
        {
          data: action.payload,
        }
      )
    },
  },
  {
    isFetching: false,
    data: null,
  }
)
