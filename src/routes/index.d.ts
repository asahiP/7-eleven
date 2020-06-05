type ComponentConstructor = (props?: any) => JSX.Element

interface RouteConfig {
  path: string
  name?: string
  component?: ComponentConstructor
  exact?: boolean
  children?: RouteConfig[]
  redirect?: string
  resetScroll?: boolean
}