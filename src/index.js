import React from 'react'
import { render } from 'react-dom'
import { Route, Router } from 'react-router-dom'
import createHistory from 'history/createHashHistory'

import 'antd/dist/antd.css'
import Home from 'pages/home/'

import * as OfflinePluginRuntime from 'offline-plugin/runtime'
OfflinePluginRuntime.install()

const history = createHistory()
/* 生成项目界面 */
render(
  <Router history={history}>
    <Route path="/" component={Home} />
  </Router>,
  document.getElementById('root')
)
