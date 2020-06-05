/// <reference path="../routes/index.d.ts" />

import React from 'react'
import { Redirect } from 'react-router-dom'

interface Config {
  unAuth?: ComponentConstructor | string
}

type Rule = (props: any) => boolean

/** 需要鉴权组件命名规范 withAuth{Rule?} needAuth{Component} */
/** config<unAuth> 可以为 React 组件或重定向路径 */
export function requireAuth (rule: Rule, config?: Config) {
  return function withAuth (View: ComponentConstructor) {
    return function Authentication (props: any) {
      if (rule(props)) {
        return (<View {...props} />)
      } else {
        const { unAuth: UnAuth } = config
        switch (typeof UnAuth) {
          case 'function':
            return (<UnAuth {...props}/>)
          case 'string':
            return (<Redirect to={UnAuth}/>)
          default:
            return (<></>)
        }
      }
    }
  }
}