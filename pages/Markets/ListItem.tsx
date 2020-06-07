import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { classNames } from '@/utils'

import { addToCart, removeFromCart } from '@/actions'

import Flipping from '@/components/Flipping'

interface Props {
  product: Products
  mapCartToCount: { [key: string]: number }
  addToCart: (id: number) => void
  removeFromCart: (id: number) => void
}

function connectedListItem ({
  product,
  mapCartToCount,
  addToCart,
  removeFromCart,
}: Props) {
  const { name, price, description, isHot, isSoldout, pic, id } = product
  const count = mapCartToCount[id] || 0

  return (
    <div className="markets__list-item common__clear">
      <Link to={`/detail/${id}`}>
        <div className="markets__list-img">
          <img src={pic} alt={name} height="100%"/>
        </div>
      </Link>
      <div className="markets__list-info">
        <span
          className={classNames('markets__list-name', { 'markets__list-name--hot': isHot })}
        >
          {name}
        </span>
        <span className="markets__list-description">{description}</span>
        <span className="markets__list-price">
          {price.toFixed(2)}
          <span className="markets__list-price--before">{(price / 0.8).toFixed(2)}</span>
        </span>
        <div className="markets__list-counter">
          <button
            className={
              classNames(
                'markets__list-counter--decrease',
                { 'markets__list-counter--hide': count === 0 }
              )
            }
            onClick={() => removeFromCart(id)}
          ></button>
          <Flipping value={count} className={classNames({ 'markets__list-counter--hide': count === 0 })}/>
          <button className="markets__list-counter--increase" onClick={() => addToCart(id)}></button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ mapCartToCount }: any) => ({ mapCartToCount })
const mapDispatchToProps = (dispatch: any) => ({
  addToCart: (id: number) => dispatch(addToCart(id)),
  removeFromCart: (id: number) => dispatch(removeFromCart(id))
})
const ListItem = connect(mapStateToProps, mapDispatchToProps)(connectedListItem)

export default ListItem