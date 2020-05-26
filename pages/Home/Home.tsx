import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { throttle, range } from '@/utils'

import './Home.scss'
import Sticky from './Sticky'
import TabBar from './TapBar'
import ScrollView from '@/components/ScrollView'

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
        
      </div>
      <TabBar/>
    </>
  )
}