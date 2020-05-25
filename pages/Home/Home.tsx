import React, { useState, useEffect } from 'react'
import './Home.scss'
import Sticky from './Sticky'
import { throttle } from '@/utils'

import Search from '@/components/Search'

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
      <Search className="home__search" onSubmit={(e: any, t: any) => console.log(t)} style={{ position: 'fixed' }}/>
      <div style={{ height: '1800px' }}></div>
    </>
  )
}