import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createHashHistory';
import { Route, Router } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import thunk from './redux-middleware/redux-thunk';
import logger from './redux-middleware/redux-logger';

import reducers from './reducers/';

import Home from 'pages/home/';

import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();

/* 定义中间件 */
const history = createHistory();
const middleware = [
    thunk,
    routerMiddleware(history),
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

/* 生成项目界面 */
render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Home}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
