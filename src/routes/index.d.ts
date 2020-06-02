type Constructor = (props?: any) => JSX.Element

interface RouteConfig {
  path: string
  authname: string
  component: Constructor
  exact?: boolean
  children?: RouteConfig[]
}