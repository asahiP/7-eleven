/// <reference path="index.d.ts" />

import RouteFactory from './RouteFactory'

import Home from '@pages/Home/Home'
import Detail from '@pages/Detail/Detail'
import User from '@pages/User/User'
import Markets from '@pages/Markets/Markets'

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    exact: true
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: Detail,
  },
  {
    path: '/user',
    name: 'user',
    component: User,
  },
  {
    path: '/markets/:nav',
    name: 'markets',
    component: Markets,
  },
  {
    path: '/markets',
    redirect: '/markets/0',
  },
]

export default function Routes () {
  return RouteFactory(routes)
}