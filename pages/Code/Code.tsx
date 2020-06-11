import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import './Code.scss'
import qrcode from '@public/img/qrcode.png'

import { productMap } from '@/store/fakeProduct'

interface Props {
  oder: Oder[]
}
function getOderById (id: string, oder: Oder[]): Oder {
  return [].concat(oder).filter(item => item.id === id)[0]
}

function connectedCode ({ oder }: Props) {
  const { id } = useParams()
  const { goBack } = useHistory()
  const oderDetail = getOderById(id, oder)

  if (!oderDetail) return null
  const { num, location, time, cart, mapCartToCount, discount, totalPrice } = oderDetail

  const totalCount = cart.reduce((prev, current) => {
    return prev + mapCartToCount[current]
  }, 0)

  return (
    <>
      <span className="common__back" onClick={goBack}>
        <span className="common__icon common__icon--arrow-left code__back"></span>
      </span>
      <p className="code__title">提货码</p>
      <div className="code__card">
        <div className="code__qrcode">
          <div className="common__qrcod-corner"></div>
          <div className="common__qrcod-corner"></div>
          <div className="common__qrcod-corner"></div>
          <div className="common__qrcod-corner"></div>
          <div className="code__qrcode-img">
            <img src={qrcode} alt="二维码" width="100%"/>
          </div>
        </div>
        <span className="code__num">提货序号：{num}</span>
        <p className="code__description">您的点餐制作完成，快去门店自提柜取餐吧！</p>
        <div className="code__row">
          <span className="code__location">
            <span className="code__location-icon">
              <span className="common__icon common__icon--location"></span>
            </span>
            <span>{location}</span>
          </span>
          <span className="code__arrow">
            <span className="common__icon common__icon--arrow-left"></span>
          </span>
        </div>
        <div className="code__row">
          <span className="code__info">取餐时间</span>
          <span className="code__time">约 {time}</span>
        </div>
        <div className="code__list-wapper">
          <ul className="code__list">
            {
              cart.map((id, key) => {
                const item = productMap[id]
                const { name, description, price } = item
                const count = mapCartToCount[id]

                return (
                  <li className="code__list-item" key={key}>
                    <span className="code__list-info">
                      <span className="code__list-name">{name}</span>
                      <span className="code__list-description">{description}</span>
                    </span>
                    <span className="code__list-count">x{count}</span>
                    <span className="code__list-price">{price.toFixed(2)}</span>
                  </li>
                )
              })
            }
          </ul>
          <div className="code__row">
            <span className="code__info">折扣满减</span>
            <span className="code__discount">{discount}</span>
          </div>
          <div className="code__row" style={{ alignItems: 'flex-end' }}>
            <span className="code__info">共 {totalCount} 件商品</span>
            <span className="code__total-price">
              <span>实付</span>
              <span>{totalPrice}</span>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = ({ oder }: any) => ({ oder })
const Code = connect(mapStateToProps)(connectedCode)
export default Code