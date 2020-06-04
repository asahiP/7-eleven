import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '@/reducers/index'

import { persistentStoreMiddleware } from '@/middleware/persistentStoreMiddleware'

const initialSagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  applyMiddleware(
    persistentStoreMiddleware,
    initialSagaMiddleware
  )
)

initialSagaMiddleware.run(function* () {})

export default store