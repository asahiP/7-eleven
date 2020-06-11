import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { throttle, range, shuffle } from '@/utils'

import './Home.scss'
import Sticky from './Sticky'
import TabBar from './TapBar'
import Products from './Products'
import NavView from '@/components/NavView'
import ProductList from './ProductList'

import fakeProduct from '@/store/fakeProduct'
import leftIcon from '@public/icons/place@2x.png'
import rightIcon from '@public/icons/oder@2x.png'

const increasedProduct = shuffle(([...range(5).map(() => fakeProduct)] as any).flat())

export default function Home (): JSX.Element {
  const [scrollTop, setScrollTop] = useState(0)
  const navText = [
    '精选推荐',
    '营养早餐',
    '工作简餐',
    '下午茶点',
    '夜宵小吃',
  ]
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
        <Products products={fakeProduct.slice(3, 9).reverse()}/>
        <div className="home__content-entry">
          <Link to="/markets" className="home__content-entry--left">
            <div className="home__content-entry-icon">
              <img src={leftIcon} alt="place" width="100%"/>
            </div>
            <div className="home__content-entry-info--left">
              <span className="home__content-entry-info--main">立即点餐</span><br/>
              <span className="home__content-entry-info--sub">在线点到店取</span>
            </div>
          </Link>
          <Link to="/oder/all" className="home__content-entry--right">
            <div className="home__content-entry-icon">
              <img src={rightIcon} alt="oder" width="100%"/>
            </div>
            <div className="home__content-entry-info--right">
              <span className="home__content-entry-info--main">我的订单</span><br/>
              <span className="home__content-entry-info--sub">随时查询进度</span>
            </div>
          </Link>
        </div>
        <NavView nav={navText}>
          {
            navText.map((omit, key) => (
              <ProductList products={increasedProduct.slice(key * 10, key * 10 + 10)} key={key} />
            ))
          }
        </NavView>
      </div>
      <TabBar/>
    </>
  )
}