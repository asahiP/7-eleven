
interface State {
  userInfo: UserInfo
  oder: Oder[]
}

interface UserInfo {
  name: string
  avatar: string
  location: string
  description: string
  point: number
  balance: number
  history: any[]
}

interface Action {
  type: string
  payload: { [key: string]: any }
}

const initialState: State = {
  userInfo: {
    name: '京酱肉丝',
    avatar: require('@public/img/fake_avatar.jpg').default,
    location: '上海浦东新区店(NO.1032)',
    description: '这个人很懒，什么也没有留下...',
    point: 1450,
    balance: 214.5,
    history: []
  },
  oder: []
}

export default function rootReducer (state = initialState, action: Action): State {
  switch (action.type) {
    default:
      return state
  }
}