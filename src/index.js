import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createHashHistory';
import { Route, Router } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import thunk from './redux-middleware/redux-actions-thunk';
import logger from './redux-middleware/redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers/';
import rootSaga from './sagas/';

import Home from 'pages/home/';

import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();

/* 定义中间件 */
// 定义日志中间件
const history = createHistory();
// 创建 saga 中间件
const sagaMiddleware = createSagaMiddleware();
const middleware = [
    thunk,
    routerMiddleware(history),
    sagaMiddleware,
    logger
];

/* 定义数据存储对象 */
const store = createStore(
    combineReducers({
        ...reducers,
        router: routerReducer
    }),
    applyMiddleware(...middleware)
);
// 执行 saga
sagaMiddleware.run(rootSaga);

/* 生成项目界面 */
render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Home}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
