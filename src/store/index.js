import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducers from './reducers'
import logger from './redux-middleware/redux-logger'

/* 定义中间件 */
const middleware = [logger]

/* 定义数据存储对象 */
const store = createStore(
  combineReducers({
    ...reducers,
  }),
  applyMiddleware(...middleware)
)
window.store = store
export default store
