import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_LOCATION,
  UPDATE_TIME
} from '@/constants'

export function addToCart (id: number) {
  return { type: ADD_TO_CART, payload: { id } }
}

export function removeFromCart (id: number) {
  return { type: REMOVE_FROM_CART, payload: { id } }
}

export function updateLocation (local: string) {
  return { type: UPDATE_LOCATION, payload: { local } }
}

export function updateTime (time: string) {
  return { type: UPDATE_TIME, payload: { time } }
}