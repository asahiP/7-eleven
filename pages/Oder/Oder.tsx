import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams, Link } from 'react-router-dom'

import './Oder.scss'
import NavView from '@/components/NavView'
import ScrollView from '@/components/ScrollView'
import { $toast } from '@/components/Toast'

import { productMap } from '@/store/fakeProduct'
import { formatTime } from '@/utils'

interface Props {
  oder: Oder[]
}

const Nav = ['全部', '待付款', '待取餐', '待评价', '退款/售后']
const Filter = ['all', 'unpay', 'untake', 'uncomment', 'after']

function connectedOder ({ oder }: Props) {
  const { goBack, replace, push } = useHistory()
  const { filter } = useParams()
  const initialIndex = Filter.indexOf(filter)
  const handleIndexChange = (index: number) => replace(`/oder/${Filter[index]}`)
  const [scrollStyle, setScrollStyle] = useState({} as React.CSSProperties)
  const [initial, setInitial] = useState(false)

  useEffect(() => {
    const nav = document.querySelector('.common__nav-wapper')
    const { height, top } = nav.getBoundingClientRect()

    setScrollStyle({
      float: 'left',
      height: document.body.clientHeight - height - top
    })
    setInitial(true)
  }, [])

  return (
    <div style={{ visibility: initial ? 'visible' : 'hidden' }}>
      <span className="common__back" onClick={goBack}>
        <span className="common__icon common__icon--arrow-left code__back"></span>
      </span>
      <span className="oder__head--right" onClick={() => $toast('正在施工中')}>
        电子订单
      </span>
      <p className="oder__title">我的订单</p>
      <div className="oder__list-wapper">
        <NavView
          nav={Nav}
          initialIndex={initialIndex < 0 ? 0 : initialIndex}
          onIndexChange={handleIndexChange}
        >
          {
            Nav.map((val, index) => {
              const filtered = oder.filter((item) => {
                return index === 0
                  ? true
                  : item.status === Filter[index]
              })
              const listItem = filtered.map((item, key) => {
                const status = index > 0
                  ? val
                  : '已完成'
                const totalCount = item.cart.reduce((prev, current) => {
                  return prev + item.mapCartToCount[current]
                }, 0)
                const name = productMap[item.cart[0]].name
                const computedName = item.cart.length > 1
                  ? name + '等'
                  : name
                return (
                  <li key={key} className="oder__list-item">
                    <span className="oder__list-id">订单号：{item.id}</span>
                    <span className="oder__list-status">{status}</span>
                    <span className="oder__list-location">{item.location}</span>
                    <span className="oder__list-time">{formatTime(item.date)}</span>
                    <span className="oder__list-name">{computedName + ` 共 ${totalCount} 件商品`}</span>
                    <span className="oder__list-price">{item.totalPrice}</span>
                    <Link className="oder__list-button" to={`/code/${item.id}`}>去取餐</Link>
                  </li>
                )
              })
              return (
                <ScrollView key={index} style={scrollStyle}>
                  <ul className="oder__list">
                    {
                      filtered.length === 0
                        ? (<li className="oder__list-empty"><span>暂无订单</span></li>)
                        : listItem
                    }
                  </ul>
                </ScrollView>
              )
            })
          }
        </NavView>
      </div>
    </div>
  )
}

const mapStateToProps = ({ oder }: any) => ({ oder })
const Oder = connect(mapStateToProps)(connectedOder)

export default Oder