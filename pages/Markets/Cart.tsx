import React from 'react'
import { useHistory } from 'react-router-dom'


export default function Cart () {
  const { replace } = useHistory()

  return (
    <div className="cart__wapper">
      <div className="cart__back" onClick={() => replace('/markets/0')}></div>
    </div>
  )
}