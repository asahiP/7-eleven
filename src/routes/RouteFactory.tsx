/// <reference path="index.d.ts" />

import React from 'react'
import { Switch, Route } from 'react-router-dom'

export default function RouteFactory (routes: RouteConfig[], props = {}, rootPath = ''): JSX.Element {
  return (
    <Switch>
      {
        routes.map((RouteConfig, key) => {
          const { path, authname, component: View, exact, children } = RouteConfig
          const resolvedPath = rootPath + path
          const routerView = Array.isArray(children) && children.length > 0
            ? function Routes (props = {}) {
              return RouteFactory(children, props, resolvedPath)
            }
            : null
          return (
            <Route
              key={key}
              path={resolvedPath}
              exact={exact}
              render={() => (<View {...props} routerView={routerView}/>)}
            />
          )
        })
      }
    </Switch>
  )
}