import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import { productMap } from '@/store/fakeProduct'
import InputSwitch from '@/components/InputSwitch'

interface Props {
  cart: number[]
  mapCartToCount: { [key: number]: number }
  userInfo: UserInfo
  onClick: (e: React.UIEvent) => void
}

interface UserInfo {
  location: string
  time: string
}

const EmptyView = () => (
  <>
    <span className="cart__empty">
      <span className="common__icon common__icon--cart"></span>
    </span>
    <span className="cart__empty-description">
      购物车空空如也
    </span>
  </>
)
const NotEmptyView = ({
  cart,
  mapCartToCount,
  userInfo,
  onClick: handleClick
}: Props) => {
  const { location, time } = userInfo
  const totalPrice = cart.reduce((prev: number, current) => {
    const { price } = productMap[current]
    return prev + (price * mapCartToCount[current])
  }, 0)

  return (
    <div className="cart__content">
      <p className="cart__title">确认订单</p>
      <div onClick={handleClick}>
        <div className="cart__row">
          <span>
            <span className="cart__location">{location}</span>
            <br/>
            <span className="cart__info">
              京(先生) 13888888888
            </span>
          </span>
          <span className="cart__arrow">
            <span className="common__icon common__icon--arrow-left"></span>
          </span>
        </div>
        <div className="cart__row">
          <span className="cart__info">取货时间</span>
          <span>
            {`约 ${time} `}
            <span className="cart__arrow">
              <span className="common__icon common__icon--arrow-left"></span>
            </span>
          </span>
        </div>
      </div>
      <ul className="cart__list">
        {
          cart.map((id, key) => {
            const { pic, name, description, price } = productMap[id]

            return (
              <li className="cart__item common__clear" key={key}>
                <div className="cart__item-pic">
                  <img src={pic} alt={name} width="100%"/>
                </div>
                <span className="cart__item-info">
                  <span className="cart__item-name">{name}</span>
                  <span className="cart__item-description">{description}</span>
                </span>
                <span className="cart__item-count">{`x${mapCartToCount[id]}`}</span>
                <span className="cart__item-price">{price.toFixed(2)}</span>
              </li>
            )
          })
        }
      </ul>
      <div className="cart__row">
        <span className="cart__info">折扣满减</span>
        <span className="cart__item-price">
          {(totalPrice / 0.8 - totalPrice).toFixed(2)}
        </span>
      </div>
      <div className="cart__row">
        <span className="cart__info">就餐方式</span>
        <InputSwitch prefix="打包" suffix="堂食"/>
      </div>
      <div className="cart__row">
        <span className="cart__info">是否加热</span>
        <InputSwitch prefix="是" suffix="否"/>
      </div>
      <div className="cart__row">
        <span className="cart__total">总计</span>
        <span>
          <span className="cart__total-num">{totalPrice.toFixed(2)}</span>
          <span className="cart__total-num--before">{(totalPrice / 0.8).toFixed(2)}</span>
        </span>
      </div>
      <button className="cart__button">立即结算</button>
    </div>
  )
}

function connectedCart (props: Props) {
  const { replace } = useHistory()
  const isCartEmpty = props.cart.length === 0

  return (
    <div className="cart__wapper">
      <div className="cart__back" onClick={() => replace('/markets/0')}></div>
      {
        isCartEmpty
        ? <EmptyView/>
        : <NotEmptyView {...props}/>
      }
    </div>
  )
}

const mapStateToProps = ({ cart, mapCartToCount, userInfo }: any) => ({ cart, mapCartToCount, userInfo })
const Cart = connect(mapStateToProps)(connectedCart)
export default Cart