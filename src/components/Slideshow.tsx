import React, { useState, useEffect, useRef } from 'react'
import { easeOutQuad } from '@/easing'
import { clamp } from '@/utils'

interface Props {
  className?: string
  children: React.ReactNode
  onIndexChange?: (index: number) => void
  index?: number
}

interface RemadeChildren {
  el: HTMLElement
  width: number
  left: number
}

export default function Slideshow ({
  className,
  children,
  onIndexChange: handleIndexChange,
  index = 0
}: Props): JSX.Element {
  const wapper = useRef(null as HTMLDivElement)
  const content = useRef(null as HTMLDivElement)
  const [contentStyle, setcontentStyle] = useState({} as React.CSSProperties)
  const remadeChildren = useRef([] as RemadeChildren[])
  const [initial, setInitial] = useState(false)

  const handleAnimationContext = useRef({
    startTime: null,
    request: null,
    duration: 250,
  })

  const handleTouchContext = useRef({
    index: 0,
    offsetLeft: 0,

    isToucing: false,
    isToRight: null,
    touchStartTime: 0,
    touchStartX: 0,
    touchStartY: 0,
    touchStartLeft: 0,
    hitedDistanceY: 0,
    touchEndX: 0
  })

  /** 缓动动画函数 */
  const step = (timeStamp: number, startValue: number, changeValue: number) => {
    const { current: context } = handleAnimationContext
    let { startTime, duration } = context
    if (!startTime) startTime = context.startTime = timeStamp
    const currentTime = timeStamp - startTime
    
    if (currentTime < duration) {
      const currentValue = easeOutQuad(
        currentTime,
        0,
        changeValue,
        duration
      )

      setTranslate(currentValue + startValue)

      context.request = window.requestAnimationFrame(timeStamp => step(timeStamp, startValue, changeValue))
    } else {
      context.startTime = null
      setTranslate(changeValue + startValue)
      window.cancelAnimationFrame(context.request)
    }
  }

  /** index取值函数 */
  const computeIndex = (offsetLeft: number): number => {
    const { width } = remadeChildren.current[0]

    return typeof width === 'number'
      ? Math.round(Math.abs(offsetLeft) / width)
      : 0
  }

  /** contentStyle更新函数 */
  const setTranslate = (offsetLeft: number) => {
    const { current: wCurrent } = wapper
    const { current: cCurrent } = content
    if (!wCurrent || !cCurrent) {
      return 0
    }
    const { offsetWidth: wWidth} = wCurrent
    const { offsetWidth: cWidth} = cCurrent
    const minTranslate = (cWidth - wWidth) * -1
    const computedOffsetLeft = Math.max(minTranslate, Math.min(offsetLeft, 0))
    
    handleTouchContext.current.offsetLeft = computedOffsetLeft
    setcontentStyle(Object.assign({}, contentStyle, {
      transform: `translate3d(${computedOffsetLeft}px, 0, 0)`
    }))
    
    return computedOffsetLeft
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const { timeStamp, touches } = e
    const { 0: touch } = touches
    const { pageX, pageY } = touch
    
    const { current: context } = handleTouchContext
    const { request } = handleAnimationContext.current
    context.isToucing = true
    context.touchStartTime = timeStamp
    context.touchStartX = context.touchEndX = pageX
    context.touchStartY = pageY
    context.touchStartLeft = context.offsetLeft

    window.cancelAnimationFrame(request)
    handleAnimationContext.current.startTime = null
  }

  const handleTouchMove = (e: TouchEvent) => {
    const minDistance = 20
    const { current: context } = handleTouchContext
    const { isToucing, touchStartX, touchStartY, touchStartLeft, hitedDistanceY } = context

    if (isToucing) {
      const { touches } = e
      const { 0: touch } = touches
      const { pageX, pageY } = touch
      const [min, max] = [pageY, touchStartY].map(n => Math.abs(n)).sort((a, b) => a - b)
      const distanceY = max - min + hitedDistanceY

      if (distanceY < minDistance) {
        const distanceX = touchStartX - pageX
        context.isToRight = distanceX < 0
        context.touchEndX = pageX
        setTranslate(touchStartLeft + distanceX * -1)
      } else {
        context.hitedDistanceY = distanceY
      }
    }
  }

  const handleTouchEnd = (e: TouchEvent) => {
    const delay = 300
    const minDistance = 50
    const { current: context } = handleTouchContext
    const { isToucing, touchStartX, touchEndX, offsetLeft, isToRight, touchStartTime } = context

    if (isToucing) {
      context.isToucing = false
      context.hitedDistanceY = 0
      const { timeStamp } = e
      let index = timeStamp - touchStartTime < delay && Math.abs(touchEndX - touchStartX) > minDistance
        ? context.index + (isToRight ? -1 : 1)
        : computeIndex(offsetLeft)
      index = clamp(index, 0, remadeChildren.current.length - 1)
      const changeValue = remadeChildren.current[index].left - offsetLeft
      handleAnimationContext.current.request = window.requestAnimationFrame(timeStamp => step(timeStamp, offsetLeft, changeValue))
      context.index = index
      typeof handleIndexChange === 'function' && handleIndexChange(index)
    }
  }

  /** 收集尺寸定位等相关数据 */
  useEffect(() => {
    remadeChildren.current = [...content.current.childNodes as any]
      .map((el: HTMLElement) => {
        const { width, left } = el.getBoundingClientRect()

        /** 重新赋值百分比宽度 */
        el.style.width = `${width}px`

        return { el, width, left }
      })
    setcontentStyle(Object.assign({}, contentStyle, {
      width: remadeChildren.current
        .map(({ width }) => width)
        .reduce((previousValue, currentValue) => previousValue + currentValue)
    }))
    setInitial(true)

    Promise.resolve()
      .then(() => {
        const { left: contentLeft } = content.current.getBoundingClientRect()
        remadeChildren.current = remadeChildren.current.map(item => {
          let { el } = item
          let { left } = el.getBoundingClientRect()

          return Object.assign({}, item, {
            left: (left - contentLeft) * -1,
          })
        })
      })
  }, [])

  useEffect(() => {
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [contentStyle])

  /** 根据index响应式更新translate */
  useEffect(() => {
    /** 等待contentStyle更新 */
    if (!initial) return
    const { current: context } = handleTouchContext
    const { offsetLeft } = context
    const _index = clamp(index, 0, remadeChildren.current.length - 1)
    
    const changeValue = remadeChildren.current[_index].left - offsetLeft
    handleAnimationContext.current.request = window.requestAnimationFrame(timeStamp => step(timeStamp, offsetLeft, changeValue))
    context.index = _index
  }, [index, initial])

  return (
    <div className={className} style={{ overflow: 'hidden' }} ref={wapper}>
      <div children={children} style={contentStyle} ref={content} onTouchStart={handleTouchStart}></div>
    </div>
  )
}