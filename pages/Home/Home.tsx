import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { throttle } from '@/utils'

import './Home.scss'
import Sticky from './Sticky'
import TabBar from './TapBar'
import Products from './Products'
import leftIcon from '@public/icons/place@2x.png'
import rightIcon from '@public/icons/oder@2x.png'

export default function Home (): JSX.Element {
  const [scrollTop, setScrollTop] = useState(0)
  useEffect(() => {
    const handleScroll = () => setScrollTop(window.scrollY)
    const bundle = throttle(handleScroll, 30)
    window.addEventListener('scroll', bundle)

    return () => window.removeEventListener('scroll', bundle)
  }, [])
  return (
    <>
      <Sticky scrollTop={scrollTop}/>
      <Link to="/" className="home__search-wapper"><span className="common__icon common__icon--search"></span></Link>
      <div className="home__content-wapper">
        <Products/>
        <div className="home__content-entry">
          <Link to="/" className="home__content-entry--left">
            <div className="home__content-entry-icon">
              <img src={leftIcon} alt="place" width="100%"/>
            </div>
            <div className="home__content-entry-info--left">
              <span className="home__content-entry-info--main">立即点餐</span><br/>
              <span className="home__content-entry-info--sub">在线点，到店取</span>
            </div>
          </Link>
          <Link to="/" className="home__content-entry--right">
            <div className="home__content-entry-icon">
              <img src={rightIcon} alt="oder" width="100%"/>
            </div>
            <div className="home__content-entry-info--right">
              <span className="home__content-entry-info--main">我的订单</span><br/>
              <span className="home__content-entry-info--sub">随时查询进度</span>
            </div>
          </Link>
        </div>
      </div>
      <TabBar/>
    </>
  )
}