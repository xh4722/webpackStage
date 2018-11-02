import React, { Component } from 'react'
import { Button } from 'antd'
import { observer } from 'mobx-react'

import { ListPanel } from 'components'
import { taskBuilder } from 'store'
import { UploadScript } from 'controller/taskBuilder'

@observer
export default class DepUploader extends Component {
  /**
   * 上传依赖脚本
   * @method upload
   */
  upload = () => {
    UploadScript.onUpload({
      name: 'testScript',
    })
  }

  render() {
    return (
      <div>
        <h2>脚本文件上传</h2>
        <Button onClick={this.upload}>上传脚本文件</Button>
        <ListPanel list={taskBuilder.scripts.map(item => item.name)} />
      </div>
    )
  }
}
