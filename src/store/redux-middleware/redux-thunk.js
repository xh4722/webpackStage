export default ({ dispatch, getState }) => next => action => {
  console.log('调用 thunk 中间件')
  if (typeof action === 'function') {
    return action(dispatch, getState)
  }

  return next(action)
}
