import React, { Component } from 'react'
import { from, of, pluck, switchMap, catchError } from 'rxjs'

import getUser from 'mock/getUser'
import getUserConfig from 'mock/getUserConfig'
import { user, userConfig } from 'store'

const initStream = from(getUser()).pipe(
  pluck('data'),
  catchError(err => of(err)),
  switchMap(res => {
    user.set(res)
    return from(getUserConfig(res))
  }).pipe(pluck('data'))
)

export default class Init extends Component {
  componentWillMount() {
    initStream.subscribe(res => {
      console.log(res)
      userConfig.set(res)
    })
  }

  render() {
    return <div />
  }
}
