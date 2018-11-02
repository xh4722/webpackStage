import React, { Component } from 'react'
import { Divider } from 'antd'

import FileManager from './FileManager'
import SoftwareSelector from './SoftwareSelector'
import DepUploader from './DepUploader'
import ScriptUploader from './ScriptUploader'

import style from './style.scss'

export default class Home extends Component {
  render() {
    return (
      <div className={style.Home}>
        <FileManager />
        <Divider />
        <SoftwareSelector />
        <Divider />
        <DepUploader />
        <Divider />
        <ScriptUploader />
      </div>
    )
  }
}
