// Copyright (C) 2018 LambdaCal Inc.

import customConnect from './customConnect'

import { MemberAction } from 'actions'

class MemberWrapper {
  constructor(props, dispatch) {
    this.props = props
    this.dispatch = dispatch
  }

  get isFetching() {
    return this.props.isFetching
  }

  get data() {
    return this.props.data
  }

  getMember(args) {
    this.dispatch(MemberAction.getMember(args))
  }
}

const mergeProps = ({ state }, { dispatch }) => {
  const { member: memberState } = state

  let member = new MemberWrapper(memberState, dispatch)

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
