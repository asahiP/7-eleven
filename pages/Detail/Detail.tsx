import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { classNames } from '@/utils'
import { $toast } from '@/components/Toast'
import { connect } from 'react-redux'


import './Detail.scss'
import fakeProduct, { productMap } from '@/store/fakeProduct'
import fakeReviews from '@/store/fakeReviews'
import Status from '@/components/Status'
import Review from './Review'
import { addToCart } from '@/actions'

interface Props {
  addToCart: (id: number) => void
}

const Soldout = () => (
  <div className="detail__soldout">
    <span className="detail__soldout-circle"></span>
    <span className="detail__soldout-text">售馨</span>
  </div>
)

function connectedDetail ({ addToCart }: Props) {
  const { id } = useParams()
  const { goBack } = useHistory()
  const item = productMap[id]
  const { pic, name, price, description, isHot, isSoldout } = item
  const handleClick = () => {
    addToCart(id)
    $toast('已添加到购物车')
  }

  return (
    <>
      <img src={pic} alt={name} width="100%"/>
      { isSoldout && (<Soldout/>) }
      <span className="common__back" onClick={goBack}>
        <span className="common__icon common__icon--arrow-left"></span>
      </span>
      <div className="detail__wapper">
        <div>
          <span
            className={classNames('detail__content-name', { 'detail__content-name--hot': isHot })}
          >
            {name}
          </span>
          <br/>
          <span
            className={
              classNames(
                'detail__content-price',
                { 'detail__content-price--soldout': isSoldout }
              )
            }
          >
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
        <button className="detail__tapbar-favorite" onClick={() => $toast('正在施工中')}>
          <span className="common__icon common__icon--heart"></span>
        </button>
        {
          isSoldout
            ? (
                <button className="detail__soldout-button" onClick={() => $toast('正在施工中')}>
                  提醒补货
                </button>
              )
            : (
                <button className="detail__tapbar-add2cart" onClick={handleClick}>
                  加入购物车
                </button>
              )
        }

      </div>
    </>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  addToCart: (id: number) => dispatch(addToCart(id))
})
const Detail = connect(null, mapDispatchToProps)(connectedDetail)

export default Detail