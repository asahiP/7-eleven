import { ADD_TO_CART, REMOVE_FROM_CART } from '@/constants'

export function addToCart (id: number) {
  return { type: ADD_TO_CART, payload: { id } }
}

export function removeFromCart (id: number) {
  return { type: REMOVE_FROM_CART, payload: { id } }
}