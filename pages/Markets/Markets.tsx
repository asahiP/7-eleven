import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { classNames, shuffle, range, random } from '@/utils'

import './Markets.scss'
import ScrollView from '@/components/ScrollView'
import Title from './Title'
import ListItem from './ListItem'
import CartMini from './CartMini'
import Cart from './Cart'
import Picker from './Picker'

import fakeProduct, { productMap } from '@/store/fakeProduct'

const navMap: any = {
  'specials': '精选推荐',
  'bentou': '便当料理',
  'breakfast': '营养早点',
  'drink': '咖啡饮料',
  'snack': '小食好炖',
  'dessert': '甜品面包',
  'salad': '轻食色拉',
}
const navIcons = Object.keys(navMap).map(key => ([key, require(`@public/icons/${key}@2x.png`).default]))
const increasedProduct = shuffle(([...range(14).map(() => fakeProduct)] as any).flat())

const banner = range(4).map(i => require(`@public/img/banner/${i}.jpg`).default)


interface Props {
  userInfo: UserInfo
  cart: number[]
}

interface UserInfo {
  location: string
  time: string
}

function connectedMarkets ({ userInfo, cart }: Props) {
  let { nav } = useParams()
  nav = parseInt(nav) || 0

  const { pathname } = useLocation()
  const { push, goBack, replace } = useHistory()
  const isCartPage = pathname === '/markets/cart'

  const { location, time } = userInfo
  const computedLocation = useMemo(() => location.replace(/\(.+\)/, ''), [location])
  const title = !isCartPage
    ? navMap[navIcons[nav][0]]
    : null

  const [animationClassName, setAnimationClassName] = useState('markets__list')
  const [scrollTop, setScrollTop] = useState(0)
  const [bannerPic, setBannerPic] = useState('')
  const [resize, setResize] = useState(0)

  const isCartEmpty = cart.length === 0
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setAnimationClassName('markets__list')
    setScrollTop(Date.now() * -1)
    setBannerPic(random(banner))

    setTimeout(() => {
      setAnimationClassName('markets__list markets__list--animation')
    })
  }, [nav])

  const handleResize = () => { setTimeout(() => setResize(Date.now()), 300) }
  useEffect(handleResize, [isCartEmpty])

  return (
    <>
      <div className="markets__background"></div>
      <div
        className={classNames(
          'markets__wapper',
          {
            'markets__wapper--not-empty': !isCartEmpty,
            'markets__wapper--should-hide': isCartPage
          }
        )}
      >
        <div className="markets__header">
          <span className="common__back" onClick={goBack}>
            <span className="common__icon common__icon--arrow-left markets__icon"></span>
          </span>
          <div className="markets__header-picker" onClick={() => setIsActive(true)}>
            <span>
              <span className="markets__header-location">
                <span className="common__icon common__icon--location"></span>
              </span>
              {' '}
              <span className="markets__header-name">{computedLocation}</span>
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
        <div className="markets__content common__clear">
          <ScrollView className="markets__content-left" resize={resize}>
            <ul className="markets__nav">
              {
                navIcons.map(([name, src], key) => (
                  <li
                    className={
                      classNames(
                        'markets__nav-item',
                        { 'markets__nav-item--current': nav === key }
                      )
                    }
                    key={key}
                    onClick={() => replace(`/markets/${key}`)}
                  >
                    <div className="markets__nav-icon">
                      <img src={src} alt={name} width="100%"/>
                    </div>
                    <span className="markets__nav-info">{navMap[name]}</span>
                  </li>
                ))
              }
            </ul>
          </ScrollView>
          <ScrollView className="markets__content-right" scrollTop={scrollTop} resize={resize}>
            <div className={animationClassName}>
              <div className="markets__banner">
                <img src={bannerPic} alt="banner" width="100%"/>
              </div>
              <Title title={title}/>
              {
                increasedProduct.slice(nav * 20, nav * 20 + 20).map(
                  (product, key) => (
                    <ListItem product={product} key={key}/>
                  )
                )
              }
            </div>
          </ScrollView>
        </div>
      </div>
      {
        !isCartPage && !isCartEmpty
          ? <CartMini onClick={() => replace('/markets/cart')}/>
          : null
      }
      {
        isCartPage
          ? <Cart onClick={() => setIsActive(true)}/>
          : null
      }
      {
        isActive
        ? <div className="common__mask" onClick={() => setIsActive(false)}></div>
        : null
      }
      <Picker isActive={isActive} time={time} onChange={() => setIsActive(false)}/>
    </>
  )
}

const mapStateToProps = ({ userInfo, cart }: any) => ({ userInfo, cart })
const Markets = connect(mapStateToProps)(connectedMarkets)

export default Markets