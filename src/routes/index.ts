/// <reference path="index.d.ts" />

import RouteFactory from './RouteFactory'

import Home from '@pages/Home/Home'
import Detail from '@pages/Detail/Detail'

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
]

export default function Routes () {
  return RouteFactory(routes)
}