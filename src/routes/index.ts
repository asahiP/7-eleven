interface route {
  path: string
  authname: string
  component: (props?: any) => JSX.Element
  exact?: boolean
}

import Home from '@pages/Home/Home'

const routes: route[] = [
  {
    path: '/',
    authname: 'home',
    component: Home,
    exact: true
  }
]

export default routes