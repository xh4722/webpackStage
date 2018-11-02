import React from 'react'
import { observer } from 'mobx-react'
import { Button } from 'antd'

import { ListPanel } from 'components'
import { taskBuilder } from 'store'

import FileUploader from './FileUploader'
import model from './model'
import style from './index.scss'

export default observer(function FileManager() {
  return (
    <div className={style.FileUploader}>
      <h2>文件上传</h2>
      <Button onClick={model.showModal}>上传文件</Button>
      <ListPanel list={taskBuilder.files.map(item => item.name)} />

      <FileUploader visible={model.visible} hideModal={model.hideModal} />
    </div>
  )
})
