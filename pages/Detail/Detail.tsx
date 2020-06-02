import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { classNames } from '@/utils'

import './Detail.scss'
import fakeProduct from '@/store/fakeProduct'
import fakeReviews from '@/store/fakeReviews'
import Status from '@/components/Status'
import Review from './Review'

interface ProductMap { [key: string]: Products }

const productMap: ProductMap = fakeProduct.reduce((prev: any, current: Products) => {
  const { id, ...another } = current
  prev[id] = another

  return prev
}, {})

export default function Detail () {
  const { id } = useParams()
  const { goBack } = useHistory()
  const item = productMap[id]
  const { pic, name, price, description } = item
  const isHot = Math.random() > 0.5

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <img src={pic} alt={name} width="100%"/>
      <span
        className="common__icon common__icon--arrow-left detail__back"
        onClick={goBack}
      ></span>
      <div className="detail__wapper">
        <div>
          <span
            className={classNames('detail__content-name', { 'detail__content-name--hot': isHot })}
          >
            {name}
          </span>
          <br/>
          <span className="detail__content-price">
            {price.toFixed(2)}
            <span className="detail__content-price--before">
              {(price / 0.8).toFixed(2)}
            </span>
          </span>
          <br/>
          <span className="detail__content-description">{description}</span>
          <br/>
          <Status {...item} className="detail__content-status"/>
          <span className="detail__content-title">用户评价</span>
          <div>
            {
              fakeReviews(25)
                .sort((a: Review, b: Review) => {
                  return b.time - a.time
                })
                .map((review, key) => {
                  return (
                    <Review review={review} key={key}/>
                  )
                })
            }
          </div>
        </div>
      </div>
      <div className="detail__tapbar">
        <button className="detail__tapbar-favorite">
          <span className="common__icon common__icon--heart"></span>
        </button>
        <button className="detail__tapbar-add2cart">
          加入购物车
        </button>
      </div>
    </>
  )
}