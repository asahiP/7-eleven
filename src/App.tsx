import React from 'react'
import { Provider, connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import store from '@/store/index'
import Routes from '@/routes/index'


export default function App (): JSX.Element {
  return (
    <Router>
      <Provider store={store}>
        <Routes/>
      </Provider>
    </Router>
  )
}