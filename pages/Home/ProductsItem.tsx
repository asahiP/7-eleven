import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { classNames } from '@/utils'

import Status from '@/components/Status'

interface Props {
  item: Products
  index: number
  current: number
}

export default function ProductsItem ({
  item,
  index,
  current,
}: Props) {
  const { name, pic, price, isSelfFetch, delay, canHeating, id } = item
  const [className, setClassName] = useState('')


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
        <button className="products__item-card__add2cart"></button>
      </div>
    </div>
  )
}