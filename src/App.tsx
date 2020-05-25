import React from 'react'
import { Provider, connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import store from '@/store/index'
import routes from '@/routes/index'


function App (): JSX.Element {
  return (
    <Switch>
      {
        routes.map(({ path, authname, component, exact }, index) => (
          <Route path={path} exact={exact} component={component} key={index}/>
        ))
      }
    </Switch>
  )
}

// const ConnectedApp = connect(null, null)(App)

export default function Layout (): JSX.Element {
  return (
    <Router>
      <Provider store={store}>
        <App/>
        {/* <ConnectedApp/> */}
      </Provider>
    </Router>
  )
}