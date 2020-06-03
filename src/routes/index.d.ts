type ComponentConstructor = (props?: any) => JSX.Element

interface RouteConfig {
  path: string
  authname: string
  component: ComponentConstructor
  exact?: boolean
  children?: RouteConfig[]
}