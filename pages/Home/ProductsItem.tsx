import React, { useState, useEffect } from 'react'
import { classNames } from '@/utils'

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
  const { name, pic, price, isSelfFetch, delay, canHeating } = item
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
        <div className="products__item-card__img">
          <img src={pic} alt={name} width="100%"/>
        </div>
        <div className="products__item-card__info">
          <span className="products__item-card__info-name">{name}</span>
          <span className="products__item-card__info-status">
            <span className="common__icon common__icon--lightning products__item-card__info-icon--lightning"></span>
            {' ' + isSelfFetch ? '到店取餐' : '外卖配送'}
            <span className="common__icon common__icon--time products__item-card__info-icon--time"></span>
            {' ' + (delay ? `${delay[0]}~${delay[1]}min` : '即到即食')}
            {
              canHeating
                ? (
                  <>
                  <span className="common__icon common__icon--heating products__item-card__info-icon--heating"></span>
                  {' '}
                  <span>支持加热</span>
                  </>
                )
                : ''
            }
          </span>
          <br/>
          <span className="products__item-card__info-price">{price.toFixed(2)}</span>
        </div>
        <button className="products__item-card__add2cart"></button>
      </div>
    </div>
  )
}