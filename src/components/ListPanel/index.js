import React, { Component } from 'react'
import style from './style.scss'

export default class ListPanel extends Component {
  render() {
    const list = this.props.list || []

    return (
      <div className={style.ListPanel}>
        {list.map((item, index) => (
          <div className={style.item} key={index}>
            {item}
          </div>
        ))}
      </div>
    )
  }
}
