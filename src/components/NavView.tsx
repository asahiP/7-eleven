import React, { useState, useRef, useEffect } from 'react'
import { classNames, getAttribute } from '@/utils'

import ScrollView from './ScrollView'
import Slideshow from './Slideshow'

interface Props {
  children: React.ReactNode
  nav: string[]
}

interface RemadeChildren {
  el: HTMLElement
  width: number
  left: number
}

export default function NavView ({
  children,
  nav,
}: Props) {
  const [index, setIndex] = useState(0)
  const navWapper = useRef(null as HTMLUListElement)
  const navSlider = useRef(null as HTMLDivElement)
  const remadeChildren = useRef([] as RemadeChildren[])
  const [scrollLeft, setScrollLeft] = useState(0)
  const [sliderStyle, setSliderStyle] = useState({} as React.CSSProperties)
  const [initial, setInitial] = useState(false)

  const handleClick = (e: React.UIEvent) => {
    const { target } = e
    const key = getAttribute(target, 'data-key')

    key && setIndex(parseInt(key))
  }

  useEffect(() => {
    remadeChildren.current = [...navWapper.current.childNodes as any]
      .map((el: HTMLElement) => {
        const { width } = el.getBoundingClientRect()

        return { el, width }
      })
      .map((item: RemadeChildren, index, array) => {
        item.left = array.slice(0, index)
          .reduce((prev, current) => {
            return prev + current.width
          }, 0)

        return item
      })
  }, [])

  useEffect(() => {
    if (!initial) setInitial(true)
    Promise.resolve()
      .then(() => {
        switch (index) {
          case 0: 
            setScrollLeft(0)
            break
          case nav.length - 1:
            setScrollLeft(Infinity)
            break
          default:
            setScrollLeft(remadeChildren.current[index - 1].left)
        }
      })
      .then(() => {
        const { offsetWidth: sWidth } = navSlider.current
        const { left, width } = remadeChildren.current[index]
        const computedTranslate = left + width / 2 - sWidth / 2

        setSliderStyle({
          transform: `translate3d(${computedTranslate}px, -100%, 0)`,
          transition: initial ? 'transform .25s ease-out' : ''
        })
      })
  }, [index, initial])

  return (
    <>
      <ScrollView className="common__nav-wapper" scrollLeft={scrollLeft}>
        <ul className="common__nav" onClick={handleClick} ref={navWapper}>
          {
          nav.map((text, key) => (
            <li
              className={classNames('common__nav-item', { 'common__nav-item--current': index === key })}
              key={key}
              data-key={key}
            >
              <span>{text}</span>
            </li>)
          )
          }
        </ul>
        <div className="common__nav-slider" style={sliderStyle} ref={navSlider}></div>
      </ScrollView>
      <Slideshow onIndexChange={setIndex} index={index}>
        {children}
      </Slideshow>
    </>
  )
}