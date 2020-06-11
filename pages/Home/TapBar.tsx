import React from 'react'
import { Link } from 'react-router-dom'

import CartIcon from '@public/icons/cart@2x.png'
import QRCodeIcon from '@public/icons/qrcode@2x.png'

export default function TapBar () {
  return (
    <ul className="tapbar__wapper">
      <li>
        <Link to="/markets/cart">
          <div className="tapbar__icon">
            <img src={CartIcon} alt="icon" width="100%"/>
          </div>
          <span className="tapbar__info">购物车</span>
        </Link>
      </li>
      <li>
        <Link to="/scan">
          <div className="tapbar__scan tapbar__scan-icon">
            <span className="common__icon common__icon--scan"></span>
            <span className="tapbar__scan-info">扫码付款</span>
          </div>
        </Link>
      </li>
      <li>
        <Link to="/code/payment">
          <div className="tapbar__icon">
            <img src={QRCodeIcon} alt="icon" width="100%"/>
          </div>
          <span className="tapbar__info">付款码</span>
        </Link>
      </li>
    </ul>
  )
}