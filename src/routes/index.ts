interface Route {
  path: string
  authname: string
  component: (props?: any) => JSX.Element
  exact?: boolean
}

import Home from '@pages/Home/Home'

const routes: Route[] = [
  {
    path: '/',
    authname: 'home',
    component: Home,
    exact: true
  }
]

export default routes