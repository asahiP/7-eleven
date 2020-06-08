import {
  INIT_FROM_PERSISTED,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_LOCATION,
  UPDATE_TIME
} from '@/constants'

interface State {
  userInfo: UserInfo
  oder: Oder[]
  cart: number[]
  mapCartToCount: { [key: string]: number }
}

interface UserInfo {
  name: string
  avatar: string
  location: string
  time: string
  description: string
  point: number
  balance: number
  history: any[]
}

interface Action {
  type: string
  payload: { [key: string]: any }
}

interface ActionMap {
  [key: string]: () => State
}

const initialState: State = {
  userInfo: {
    name: '京酱肉丝',
    avatar: require('@public/img/fake_avatar.jpg').default,
    location: '上海浦东新区店(NO.1032)',
    time: '08:30',
    description: '这个人很懒，什么也没有留下...',
    point: 1450,
    balance: 214.5,
    history: []
  },
  oder: [],
  cart: [],
  mapCartToCount: {}
}

export default function rootReducer (state = initialState, action: Action): State {
  const actionMap: ActionMap = {
    [INIT_FROM_PERSISTED] () {
      return Object.assign({}, state, action.payload)
    },
    [ADD_TO_CART] () {
      const mapCartToCount = Object.assign({}, state.mapCartToCount)
      const id = action.payload.id
      const cart = state.cart.concat()

      if (id in mapCartToCount) {
        mapCartToCount[id]++
      } else {
        mapCartToCount[id] = 1
      }

      if (!cart.includes(id)) {
        cart.push(id)
      }

      return Object.assign({}, state, {
        cart,
        mapCartToCount
      })
    },
    [REMOVE_FROM_CART] () {
      const mapCartToCount = Object.assign({}, state.mapCartToCount)
      const id = action.payload.id
      let cart = state.cart.concat()

      mapCartToCount[id]--

      if (mapCartToCount[id] <= 0) {
        delete mapCartToCount[id]
        cart = cart.filter(item => item != id)
      }

      return Object.assign({}, state, {
        cart,
        mapCartToCount
      })
    },
    [UPDATE_LOCATION] () {
      const userInfo = Object.assign({}, state.userInfo)
      const { local } = action.payload

      userInfo['location'] = local

      return Object.assign({}, state, {
        userInfo
      })
    },
    [UPDATE_TIME] () {
      const userInfo = Object.assign({}, state.userInfo)
      const { time } = action.payload

      userInfo['time'] = time

      return Object.assign({}, state, {
        userInfo
      })
    }
  }

  const matchedAction = actionMap[action.type]

  return typeof matchedAction === 'function'
    ? matchedAction()
    : state
}