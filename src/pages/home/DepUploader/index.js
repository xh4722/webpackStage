import React, { Component } from 'react'
import { Button } from 'antd'
import { observer } from 'mobx-react'

import { taskBuilder } from 'store'
import { UploadDep } from 'controller/taskBuilder'
import { ListPanel } from 'components'

import style from './style.scss'

@observer
export default class DepUploader extends Component {
  /**
   * 上传依赖脚本
   * @method upload
   */
  upload = () => {
    UploadDep.onUpload({
      name: 'testDep',
    })
  }

  render() {
    return (
      <div className={style.DepUploader}>
        <h2>依赖脚本上传</h2>
        <Button onClick={this.upload}>上传依赖脚本</Button>
        <div className={style.list}>
          <ListPanel list={taskBuilder.deps.map(item => item.name)} />
        </div>
      </div>
    )
  }
}
