import React, { useEffect, useMemo } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import './Markets.scss'
import { connect } from 'react-redux'

interface Props {
  userInfo: UserInfo
}

interface UserInfo {
  location: string
  time: string
}

function connectedMarkets ({ userInfo }: Props) {
  const { pathname } = useLocation()
  const { push, goBack } = useHistory()
  const isCartPage = pathname === '/cart'

  const { location, time } = userInfo
  const computedLocation = useMemo(() => location.replace(/\(.+\)/, ''), [location])

  return (
    <>
      <div className="markets__wapper">
        <div className="markets__header">
          <span className="common__back" onClick={goBack}>
            <span className="common__icon common__icon--arrow-left markets__icon"></span>
          </span>
          <div className="markets__header-picker">
            <span>
              <span className="markets__header-location">
                <span className="common__icon common__icon--location"></span>
              </span>
              {' '}
              {computedLocation}
              <span className="markets__header-arrow">
                <span className="common__icon common__icon--arrow-left"></span>
              </span>
            </span>
            <span className="markets__header-time">
              <span className="markets__header-info">取餐时间：</span>
              {time}
            </span>
          </div>
          <span className="common__settings">
            <span className="common__icon common__icon--search markets__icon"></span>
          </span>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = ({ userInfo }: any) => ({ userInfo })
const Markets = connect(mapStateToProps)(connectedMarkets)

export default Markets