import { INIT_FROM_PRESIST } from '@/constants'

/** 需要持续化的 STORE 键名 */
const KEY: string[] = ['oder', 'cart', 'mapCartToCount']
const PRESISTENT_STORE = 'PRESISTENT_STORE'

export function persistentStoreMiddleware (store: any) {
  let cache: string

  window.addEventListener('load', () => {
    const stringifyState = sessionStorage.getItem(PRESISTENT_STORE)
    if (stringifyState) {
      store.dispatch({ type: INIT_FROM_PRESIST, payload: JSON.parse(stringifyState) })
    }
  }, { once: true })
  return (next: any) => (action: any) => {
    const result = next(action)
    const newState = store.getState()
    const needToPersist = KEY.reduce((prev: any, current: string) => {
      prev[current] = newState[current]
      return prev
    }, {})
    const stringifyState = JSON.stringify(needToPersist)

    if (stringifyState !== cache) {
      cache = stringifyState
      sessionStorage.setItem(PRESISTENT_STORE, stringifyState)
    }

    return result
  }
}