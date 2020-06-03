/// <reference path="index.d.ts" />

import RouteFactory from './RouteFactory'

import Home from '@pages/Home/Home'
import Detail from '@pages/Detail/Detail'
import User from '@pages/User/User'

const routes: RouteConfig[] = [
  {
    path: '/',
    authname: 'home',
    component: Home,
    exact: true
  },
  {
    path: '/detail/:id',
    authname: 'detail',
    component: Detail,
  },
  {
    path: '/user',
    authname: 'user',
    component: User,
  }
]

export default function Routes () {
  return RouteFactory(routes)
}