import { handleActions, combineActions } from 'redux-actions'
import { MemberAction } from 'actions'

let { get, getFail, getSuccess, setName } = MemberAction

export default handleActions(
  {
    [get]: (state, action) => {
      return Object.assign(
        {
          isFetching: true,
        },
        {
          data: action.payload,
        }
      )
    },
    [setName]: (state, action) => {
      console.log(action)
      return {
        ...state,
        data: {
          ...state.data,
          name: action.payload,
        },
      }
    },
    [combineActions(getFail, getSuccess)]: (state, action) => {
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
