import React, { useState, useEffect, useRef } from 'react'
import { easeOutQuad } from '@/easing'

interface Props {
  className?: string
  children?: React.ReactNode
  onIndexChange?: (index: number) => void
  onTranslateChange?: (relative: number) => void
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
  onTranslateChange: handleTranslateChange,
  index = 0
}: Props): JSX.Element {
  const wapper: React.MutableRefObject<HTMLDivElement> = useRef(null)
  const content: React.MutableRefObject<HTMLDivElement> = useRef(null)
  const [contentStyle, setcontentStyle] = useState({} as React.CSSProperties)
  const remadeChildren: React.MutableRefObject<RemadeChildren[]> = useRef([])
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
    touchStartLeft:0,
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
    const { offsetWidth: wWidth} = wapper.current
    const { offsetWidth: cWidth} = content.current
    const minTranslate = (cWidth - wWidth) * -1
    const computedOffsetLeft = Math.max(minTranslate, Math.min(offsetLeft, 0))
    const { touchStartLeft } = handleTouchContext.current

    handleTouchContext.current.offsetLeft = computedOffsetLeft
    setcontentStyle(Object.assign({}, contentStyle, {
      transform: `translate3d(${computedOffsetLeft}px, 0, 0)`
    }))

    const isToRight = computedOffsetLeft > touchStartLeft
    const index = Math.max(
      0,
      Math.min(
        computeIndex(touchStartLeft) + (isToRight ? -1 : 1),
        remadeChildren.current.length - 1
      )
    )

    let relative: number
    /** 除数为0的权宜之计，可能有更优解 */
    if (remadeChildren.current[index].left === 0) {
      relative = (1 - computedOffsetLeft / (computedOffsetLeft + touchStartLeft)) * -1
    } else {
      relative = Math.abs(computedOffsetLeft / remadeChildren.current[index].left) + (isToRight ? -2 : 0)
    }
    /** 首尾取0 */
    if (index === computeIndex(touchStartLeft)) relative = 0
    /** 调用钩子函数 */
    typeof handleTranslateChange === 'function' && handleTranslateChange(relative)
    
    return computedOffsetLeft
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const { timeStamp, touches } = e
    const { 0: touch } = touches
    const { pageX } = touch
    
    const { current: context } = handleTouchContext
    const { request } = handleAnimationContext.current
    context.isToucing = true
    context.touchStartTime = timeStamp
    context.touchStartX = context.touchEndX = pageX
    context.touchStartLeft = context.offsetLeft

    window.cancelAnimationFrame(request)
    handleAnimationContext.current.startTime = null
  }

  const handleTouchMove = (e: TouchEvent) => {
    const { current: context } = handleTouchContext
    const { isToucing, touchStartX, touchStartLeft } = context

    if (isToucing) {
      const { touches } = e
      const { 0: touch } = touches
      const { pageX } = touch
      const distance = touchStartX - pageX
      context.isToRight = distance < 0
      context.touchEndX = pageX
      setTranslate(touchStartLeft + distance * -1)
    }
  }

  const handleTouchEnd = (e: TouchEvent) => {
    const delay = 300
    const minDistance = 50
    const { current: context } = handleTouchContext
    const { isToucing, touchStartX, touchEndX, offsetLeft, isToRight, touchStartTime } = context

    if (isToucing) {
      context.isToucing = false
      const { timeStamp } = e
      let index = timeStamp - touchStartTime < delay && Math.abs(touchEndX - touchStartX) > minDistance
        ? context.index + (isToRight ? -1 : 1)
        : computeIndex(offsetLeft)
      index = Math.max(0, Math.min(index, remadeChildren.current.length - 1))
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
    const _index = Math.max(0, Math.min(index, remadeChildren.current.length - 1))
    
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