import React from 'react'
import { Provider, connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import store from '@/store/index'

import Home from ''

function App () {
  return (
    <>
      <span className="common__icon common__icon--cart"></span>
      <span className="common__icon common__icon--time"></span>
      <span className="common__icon common__icon--heating"></span>
      <span className="common__icon common__icon--lightning"></span>
      <span className="common__icon common__icon--scan"></span>
      <span className="common__icon common__icon--search"></span>
    </>
  )
}

const ConnectedApp = connect(null, null)(App)

export default function Layout () {
  return (
    <Provider store={store}>
      <ConnectedApp/>
    </Provider>
  )
}