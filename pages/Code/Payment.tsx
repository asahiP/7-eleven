import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import './Payment.scss'
import qrcode from '@public/img/qrcode.png'
import barcode from '@public/img/barcode.png'
import { $toast } from '@/components/Toast'


export default function Payment () {
  const { goBack } = useHistory()

  return (
    <>
      <span className="common__back" onClick={goBack}>
        <span className="common__icon common__icon--arrow-left code__back"></span>
      </span>
      <p className="code__title">付款码</p>
      <div className="payment__card">
        <p className="code__description">在APP首页，摇一摇手机立即打开付款码</p>
        <div className="payment__barcode">
          <img src={barcode} alt="条形码" width="100%"/>
        </div>
        <p className="payment__barcode-text">8888 8888 8888 888888</p>
        <div className="payment__qrcode">
          <div className="common__qrcod-corner"></div>
          <div className="common__qrcod-corner"></div>
          <div className="common__qrcod-corner"></div>
          <div className="common__qrcod-corner"></div>
          <div className="payment__qrcode-img">
            <img src={qrcode} alt="二维码" width="100%"/>
          </div>
        </div>
        <p className="payment__description">
          <span className="common__icon common__icon--barcode"></span>
          向商家付款
        </p>
        <div className="code__list-wapper">
          <div className="code__row" onClick={() => $toast('正在施工中')}>
            <span className="payment__info">
              <span className="payment__info-name">付款方式</span>
              <span className="payment__info-description">优先使用此支付方式付款</span>
            </span>
            <span className="code__arrow">
              <span className="common__icon common__icon--arrow-left"></span>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}