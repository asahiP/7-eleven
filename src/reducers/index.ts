
interface State {
  userInfo: UserInfo
}

interface UserInfo {
  name: string
  avatar: string
  location: string
}

interface Action {
  type: string
  payload: { [key: string]: any }
}

const initialState: State = {
  userInfo: {
    name: 'Luke',
    avatar: '',
    location: '上海浦东新区店(NO.1032)'
  }
}

export default function rootReducer (state = initialState, action: Action): State {
  switch (action.type) {
    default:
      return state
  }
}