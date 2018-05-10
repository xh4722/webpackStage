import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createHashHistory';
import { Route, Router } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import Home from 'pages/home/';

/* 定义中间件 */
const history = createHistory();
const middleware = [
    routerMiddleware(history)
];

/* 定义数据存储对象 */
const store = createStore(
    combineReducers({ router: routerReducer }),
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
