export default ({ dispatch, getState }) => next => action => {
    console.log('调用 redux-actions-thunk 中间件');
    if(action.payload && typeof action.payload === 'function') {
        return action.payload(dispatch, getState);
    }

    return next(action);
}
