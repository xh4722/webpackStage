// Copyright (C) 2018 LambdaCal Inc.

import customConnect from './customConnect'

import Ctrl from 'controller'

const mergeProps = ({ state }, { dispatch }) => {
  const { member: memberState } = state

  let member = new Ctrl.member(memberState, dispatch)

  return {
    member,
  }
}

/**
 * use selector to select needed states.
 * e.g. const selector = ({ client }) => ({ client })
 * Note: the type of this client is Domain.Client
 */
export default selector => customConnect(mergeProps, selector)
