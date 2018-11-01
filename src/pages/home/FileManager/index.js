import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Button } from 'antd'
import { taskBuilder } from 'store'
import { onUploadFile } from 'controller/taskBuilder'

import style from './index.scss'

@observer
export default class FileUploader extends Component {
  /**
   * 上传文件
   * @method onUpload
   */
  onUpload = () => {
    onUploadFile({
      name: 'test',
    })
  }

  render() {
    return (
      <div className={style.FileUploader}>
        <Button onClick={this.onUpload}>上传文件</Button>
        <ul>
          {taskBuilder.files.map(file => (
            <li>{file.name}</li>
          ))}
        </ul>
      </div>
    )
  }
}
