import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { throttle, range } from '@/utils'

import './Home.scss'
import Sticky from './Sticky'
import TabBar from './TapBar'
import Slideshow from '@/components/Slideshow'
import Flipping from '@/components/Flipping'

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
        <Flipping value={'asdadasd'}/>
        <Slideshow index={2}>
          {
            range(10).map((i) => (<div key={i} style={{ width: '100%', height: 300, float: 'left', background: `rgb(${range(3).map(e => 20 * i).join(', ')})` }}></div>))
          }
        </Slideshow>
      </div>
      <TabBar/>
    </>
  )
}