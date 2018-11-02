import React, { Component } from 'react'
import { Select } from 'antd'
import { observer } from 'mobx-react'

import { SelectSoftware } from 'controller/taskBuilder'
import { taskBuilder } from 'store'

const Option = Select.Option

@observer
export default class SoftwareSelector extends Component {
  /**
   * 切换软件
   * @method changeSoftware
   */
  changeSoftware = value => {
    SelectSoftware.onSelect({
      name: value,
    })
  }

  render() {
    return (
      <div>
        <h2>软件选择</h2>
        <Select
          value={taskBuilder.software.name}
          onChange={this.changeSoftware}>
          {['Abaqus', 'Star-CCM', 'Fluent', 'LS-DYBA'].map((item, index) => (
            <Option value={item} key={index}>
              {item}
            </Option>
          ))}
        </Select>
      </div>
    )
  }
}
