import React from 'react'
import { render } from 'react-dom'
import { Route, Router } from 'react-router-dom'
import createHistory from 'history/createHashHistory'
import { hot } from 'react-hot-loader'

import Home from 'pages/home/'

import 'antd/dist/antd.css'

import * as OfflinePluginRuntime from 'offline-plugin/runtime'
OfflinePluginRuntime.install()

const history = createHistory()

/* 生成项目界面 */
const Main = hot(module)(() => (
  <Router history={history}>
    <Route path="/" component={Home} />
  </Router>
))
render(<Main />, document.getElementById('root'))
