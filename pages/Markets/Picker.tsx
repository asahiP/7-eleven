import React from 'react'
import { classNames, range, getAttribute } from '@/utils'

import NavView from '@/components/NavView'
import ScrollView from '@/components/ScrollView'

import { location } from '@/store/location'
import { updateLocation, updateTime } from '@/actions'
import { connect } from 'react-redux'

const nav = ['自提门店', '取餐时间']
const dayMap = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const sortedLocation = location.sort((a, b) => (a[2] - b[2]))
const frendlyDistance = (distance: number) => {
  let _distance = Math.round(distance)

  return _distance > 1000
  ? (_distance / 1000).toFixed(1) + 'km'
  : _distance + 'm'
}
const frendlyTime = (time: number) => {
  const h = Math.floor(time / 60)
  const m = time % 60

  return [h, m]
    .map(n => n < 10 ? `0${n}` : n)
    .join(':')
}
const incrementTime = range(8 * 60 + 30, 23 * 60 + 15, 15).map(frendlyTime)

interface Props {
  isActive: boolean
  time: string
  updateLocation: (local: string) => void
  updateTime: (time: string) => void
  onChange: () => void
}

function connectedPicker ({
  isActive,
  time: currentTime,
  updateLocation,
  updateTime,
  onChange: handleChange
}: Props) {
  const today = `今天(${dayMap[new Date().getDay()]})`

  const handlePick = (e: React.UIEvent, dispatch: Function) => {
    const { target } = e
    const val = getAttribute(target, 'data-payload')

    val && dispatch(val) && handleChange && handleChange()
  }
  const pickLocation = (e: React.UIEvent) => handlePick(e, updateLocation)
  const pickTime = (e: React.UIEvent) => handlePick(e, updateTime)
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
            <ul className="picker__item-wapper" onClick={pickLocation}>
              {
                sortedLocation.map(([name, local, distance], key) => (
                  <li className="picker__item" key={key} data-payload={name}>
                    <span
                      className={
                        classNames(
                          'picker__local-name',
                          { 'picker__local-name--nearest': key === 0 }
                        )
                      }
                    >
                      <span>{name}</span>
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
          <ScrollView className="picker__scroll-view">
            <ul className="picker__item-wapper" onClick={pickTime}>
              {
                incrementTime.map((time, key) => (
                  <li className="picker__item picker__item--shorter" key={key} data-payload={time}>
                    <span className="picker__time-num">{time}</span>
                    <span className="picker__time-description">(加工完成)</span>
                    {
                      currentTime === time
                        ? (
                            <span className="picker__time--current">
                              <span className="common__icon common__icon--correct"></span>
                            </span>
                          )
                        : null
                    }
                  </li>
                ))
              }
            </ul>
        </ScrollView>
        </div>
      </NavView>
    </div>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  updateLocation: (local: string) => dispatch(updateLocation(local)),
  updateTime: (time: string) => dispatch(updateTime(time))
})
const Picker = connect(null, mapDispatchToProps)(connectedPicker)

export default Picker