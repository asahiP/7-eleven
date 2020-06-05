import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '@/reducers/index'

import { persistedStateMiddleware } from '@/middleware/persistedStateMiddleware'

const initialSagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  applyMiddleware(
    initialSagaMiddleware,
    persistedStateMiddleware,
  )
)

initialSagaMiddleware.run(function* () {})

export default store