export default ({ dispatch, getState }) => next => action => {
  console.log('调用日志中间件')
  console.log(`Action:${action.type}`)
  console.log(`payload:${JSON.stringify(action.payload)}`)

  return next(action)
}
