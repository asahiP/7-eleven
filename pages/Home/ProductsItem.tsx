import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { classNames } from '@/utils'
import { connect } from 'react-redux'

import Status from '@/components/Status'
import { addToCart } from '@/actions'
import { $toast } from '@/components/Toast'

interface Props {
  item: Products
  index: number
  current: number
  addToCart: (id: number) => void
}

function connectedProductsItem ({
  item,
  index,
  current,
  addToCart
}: Props) {
  const { name, pic, price, id } = item
  const [className, setClassName] = useState('')
  const handleClick = () => {
    addToCart(id)
    $toast('已添加到购物车')
  }

  useEffect(() => {
    setClassName(classNames(
      'products__item-card',
      {
        'products__item-card--prev' : index === current - 1,
        'products__item-card--current' : index === current,
        'products__item-card--next' : index === current + 1,
      }
    ))
  }, [index, current])
  return (
    <div className="products__item-wapper">
      <div className={className}>
        <Link to={`/detail/${id}`}>
          <div className="products__item-card__img">
            <img src={pic} alt={name} width="100%"/>
          </div>
        </Link>
        <div className="products__item-card__info">
          <span className="products__item-card__info-name">{name}</span>
          <Status {...item}/>
          <span className="products__item-card__info-price">{price.toFixed(2)}</span>
        </div>
        <button className="products__item-card__add2cart" onClick={handleClick}></button>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  addToCart: (id: number) => dispatch(addToCart(id))
})
const ProductsItem = connect(null, mapDispatchToProps)(connectedProductsItem)
export default ProductsItem