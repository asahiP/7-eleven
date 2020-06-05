import React from 'react'
import { connect } from 'react-redux'
import { $toast } from '@/components/Toast'

import './User.scss'
import Profile from './Profile'

import Unpay from '@public/icons/unpay@2x.png'
import Untake from '@public/icons/untake@2x.png'
import Uncomment from '@public/icons/uncomment@2x.png'
import After from '@public/icons/after@2x.png'

interface Props {
  oder: Oder[]
}

function ConnectedUser ({ oder }: Props) {
  return (
    <>
      <Profile/>
      <div className="user__wapper">
        <p className="user__oder-title">
          我的订单
          <span className="user__oder-title-sub">
            全部订单 {'>'}
          </span>
        </p>
        <div className="user__oder-box">
          <div className="user__oder-box-item">
            <div className="user__oder-box-icon">
              <img src={Unpay} alt="unpay" width="100%"/>
            </div>
            <span className="user__oder-box-title">待付款</span>
          </div>
          <div className="user__oder-box-item">
            <div className="user__oder-box-icon">
              <img src={Untake} alt="untake" width="100%"/>
            </div>
            <span className="user__oder-box-title">待取餐</span>
            {
              oder.length > 0
                ? <div className="user__oder-badge">{oder.length}</div>
                : null
            }
          </div>
          <div className="user__oder-box-item">
            <div className="user__oder-box-icon">
              <img src={Uncomment} alt="uncomment" width="100%"/>
            </div>
            <span className="user__oder-box-title">待评价</span>
          </div>
          <div className="user__oder-box-item">
            <div className="user__oder-box-icon">
              <img src={After} alt="after" width="100%"/>
            </div>
            <span className="user__oder-box-title">退款/售后</span>
          </div>
        </div>
        <ul className="user__list" onClick={() => $toast('正在施工中')}>
          <li className="user__list-item">
            <span className="user__list-icon">
              <span className="common__icon common__icon--heart"></span>
            </span>
            <span className="user__list-text">收藏</span>
            <span className="user__list-icon--right">
              <span className="common__icon common__icon--arrow-left"></span>
            </span>
          </li>
          <li className="user__list-item">
            <span className="user__list-icon">
              <span className="common__icon common__icon--coupon"></span>
            </span>
            <span className="user__list-text">优惠券</span>
            <span className="user__list-coupon">2 张</span>
            <span className="user__list-icon--right">
              <span className="common__icon common__icon--arrow-left"></span>
            </span>
          </li>
          <li className="user__list-item">
            <span className="user__list-icon">
              <span className="common__icon common__icon--customer-service"></span>
            </span>
            <span className="user__list-text">客服</span>
            <span className="user__list-icon--right">
              <span className="common__icon common__icon--arrow-left"></span>
            </span>
          </li>
          <li className="user__list-item">
            <span className="user__list-icon">
              <span className="common__icon common__icon--info"></span>
            </span>
            <span className="user__list-text">关于我们</span>
            <span className="user__list-icon--right">
              <span className="common__icon common__icon--arrow-left"></span>
            </span>
          </li>
        </ul>
      </div>
    </>
  )
}

const mapStateToProps = ({ oder }: any) => ({ oder })
const User = connect(mapStateToProps)(ConnectedUser)

export default User