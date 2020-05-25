import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '@/reducers/index'

const initialSagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  applyMiddleware(
    initialSagaMiddleware
  )
)

initialSagaMiddleware.run(function* () {})

export default store