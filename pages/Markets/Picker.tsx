import React from 'react'
import { classNames } from '@/utils'

import NavView from '@/components/NavView'
import ScrollView from '@/components/ScrollView'

import { location } from '@/store/location'

const nav = ['自提门店', '取餐时间']
const dayMap = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const sortedLocation = location.sort((a, b) => {
  return a[2] - b[2]
})
const frendlyDistance = (distance: number) => {
  let _distance = Math.round(distance)

  return _distance > 1000
  ? (_distance / 1000).toFixed(1) + 'km'
  : _distance + 'm'
}

interface Props {
  className?: string
  isActive: boolean
}

export default function Picker ({
  className,
  isActive
}: Props) {
  const today = `今天(${dayMap[new Date().getDay()]})`
  return (
    <div
      className={
        classNames(
          'picker__wapper',
          { 'picker__wapper--active': isActive }
        )
      }
    >
      <NavView nav={nav}>
        <div className="picker__list">
        <span className="picker__title">
          <span className="picker__icon">
            <span className="common__icon common__icon--location"></span>
          </span>
          <span>上海</span>
          <span className="picker__arrow">
            <span className="common__icon common__icon--arrow-left"></span>
          </span>
        </span>
        <ScrollView className="picker__scroll-view">
            <ul className="picker__item-wapper">
              {
                sortedLocation.map(([name, local, distance], key) => (
                  <li className="picker__item" key={key}>
                    <span
                      className={
                        classNames(
                          'picker__local-name',
                          { 'picker__local-name--nearest': key === 0 }
                        )
                      }
                    >
                      {name}
                    </span>
                    <span className="picker__local-addr">{local}</span>
                    <span className="picker__local-distance">{frendlyDistance(distance)}</span>
                  </li>
                ))
              }
            </ul>
        </ScrollView>
        </div>
        <div className="picker__list">
          <span className="picker__title">
            <span className="picker__icon picker__time">
              <span className="common__icon common__icon--time"></span>
            </span>
            <span>{today}</span>
            <span className="picker__arrow">
              <span className="common__icon common__icon--arrow-left"></span>
            </span>
          </span>
        </div>
      </NavView>
    </div>
  )
}