
interface state {
  userInfo: userInfo
}

interface userInfo {
  name: string
  avatar: string
  location: string
}

const initialState: state = {
  userInfo: {
    name: 'Luke',
    avatar: '',
    location: '上海浦东新区店(NO.1032)'
  }
}

export default function rootReducer (state = initialState, action: any): state {
  switch (action.type) {
    default:
      return state
  }
}