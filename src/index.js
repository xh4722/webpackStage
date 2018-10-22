import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Router } from 'react-router-dom'
import createHistory from 'history/createHashHistory'

import store from 'store'
import Home from 'pages/home/'

import * as OfflinePluginRuntime from 'offline-plugin/runtime'
OfflinePluginRuntime.install()

const history = createHistory()
/* 生成项目界面 */
render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Home} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
