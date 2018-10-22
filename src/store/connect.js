// Copyright (C) 2018 LambdaCal Inc.

import { connect } from 'react-redux'

import Ctrl from 'controller'

/**
 * 属性变更函数
 * @param {object} stateProps
 * @param {object} dispatchProps
 */
const mergeProps = ({ state }) => {
  const { member: memberState } = state

  return {
    // 会员控制器
    member: Ctrl.member.create(memberState),
  }
}

/**
 * 使用选择器筛选所需的 props
 * @param {Function} selector
 */
export default (selector, mapDispatchToProps) =>
  connect(
    (state, ownProps) => ({ state, ownProps }),
    mapDispatchToProps,
    (stateProps, dispatchProps, ownProps) => {
      // 扩展 props，使其具有逻辑处理的能力
      let mergedProps = mergeProps(stateProps)
      if (selector && typeof selector === 'function') {
        mergedProps = selector(mergedProps)
      }
      return { ...mergedProps, ...dispatchProps, ...ownProps }
    }
  )
