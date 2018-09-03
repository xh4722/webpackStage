// Copyright (C) 2018 LambdaCal Inc.

import { connect } from 'react-redux'

function customMergeProps(mergeProps, selector) {
  return (stateProps, dispatchProps, ownProps) => {
    const mergedProps = mergeProps(stateProps, dispatchProps)
    if (!selector || typeof selector !== 'function') {
      return { ...mergeProps(stateProps, dispatchProps), ...ownProps }
    }
    return { ...selector(mergedProps), ...ownProps }
  }
}

/**
 * @param {Function} mergeProps this function will be passed all the needed stuff about redux and
 *                              is responsible for creating all stuff needed by view layer.
 * @param {Function} selector select useful state to pass into particular component
 * @example
 * ```
 * const mergeProps = ({ User: userProps }, { dispatch }) => {
 *  return {
 *    user: new User(userProps, dispatch)
 *  };
 * }
 *
 * const selector = ({ user }) => ({ user })
 */
const customConnect = (mergeProps, selector) =>
  connect(
    (state, ownProps) => ({ state, ownProps }),
    undefined,
    customMergeProps(mergeProps, selector)
  )

export default customConnect
