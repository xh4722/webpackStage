import React, { Component } from 'react'
import { Modal } from 'antd'
import { observer } from 'mobx-react'
import { from } from 'rxjs'
import { pluck, catchError } from 'rxjs/operators'

import { UploadFile } from 'controller/taskBuilder'
import getUploadFiles from 'mock/getUploadFiles'

import model from './model'
import style from './style.scss'

// 文件获取流
const fetchListStream = from(getUploadFiles()).pipe(
  pluck('data'),
  catchError(err => console.error(err))
)

@observer
export default class FileUploader extends Component {
  componentWillMount() {
    // 获取文件列表
    fetchListStream.subscribe(data => {
      model.setList(data)
    })
  }

  /**
   * 上传文件
   * @method upload
   */
  upload = () => {
    UploadFile.onUpload({
      name: 'test',
    })
  }

  render() {
    const { visible, hideModal } = this.props

    return (
      <Modal visible={visible} title="文件上传" onCancel={hideModal}>
        <div className={style.List}>
          {model.list.map((item, index) => (
            <div key={index} className={style.item} onClick={this.upload}>
              {item.name}
            </div>
          ))}
        </div>
      </Modal>
    )
  }
}
