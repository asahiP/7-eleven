interface route {
  path: string
  authname: string
  component: JSX.Element
  exact?: boolean
}

import Home from '@pages/Home/Home'

const routes = [
  {
    path: '/',
    authname: 'home',
    component: Home,
    exact: true
  }
]

export default routes