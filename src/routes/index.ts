/// <reference path="index.d.ts" />

import RouteFactory from './RouteFactory'

import Home from '@pages/Home/Home'
import Detail from '@pages/Detail/Detail'
import User from '@pages/User/User'
import Markets from '@pages/Markets/Markets'
import Code from '@pages/Code/Code'
import Payment from '@pages/Code/Payment'
import Oder from '@pages/Oder/Oder'
import Scan from '@pages/Scan/Scan'

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
  {
    path: '/code/payment',
    /** 付款码 */
    name: 'payment',
    component: Payment
  },
  {
    path: '/code/:id',
    /** 取货码 */
    name: 'code',
    component: Code
  },
  {
    path: '/code',
    redirect: '/code/payment',
  },
  {
    path: '/oder/:filter',
    component: Oder,
  },
  {
    path: '/oder',
    redirect: '/oder/all'
  },
  {
    path: '/scan',
    component: Scan
  },
  {
    path: '*',
    redirect: '/'
  }
]

export default function Routes () {
  return RouteFactory(routes)
}