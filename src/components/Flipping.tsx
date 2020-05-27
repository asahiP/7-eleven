import React, { useState, useRef, useEffect } from 'react'
import { easeOutQuad } from '@/easing'

interface Props {
  className?: string
  value: string
  duration?: number
  onAnimationEnd?: () => void
}

export default function Flipping ({
  className,
  value,
  duration = 300,
  onAnimationEnd: handleAnimationEnd,
}: Props) {
  const [flippedValue, setFlippedValue] = useState(value)
  const [flippingValue, setFlippingValue] = useState('')
  
  const from = useRef(null)
  const to = useRef(null)
  const template = useRef(null)
  
  const [wapperStyle, setWapperStyle] = useState({
    display: 'inline-block', overflow: 'hidden', transition: `width ${duration / 2}ms ease-out, height ${duration / 2}ms ease-out`
  })
  const templateStyle = { visibility: 'hidden', position: 'absolute' } as React.CSSProperties
  const [fromStyle, setFromStyle] = useState({ float: 'left' } as React.CSSProperties)
  const [toStyle, setToStyle] = useState({ float: 'left' } as React.CSSProperties)

  const handleFlipContext = useRef({
    isFlipping: false,
    waitForFlip: null,
  })

  useEffect(() => {
    const { current: context } = handleFlipContext
    const { isFlipping } = context
    
    /** 动画未结束时再次调用跳出 */
    if (isFlipping) {
      context.waitForFlip = value
      return
    }

    /** 当 flippedValue 等于 value 时跳出 */
    if (flippedValue === value) {
      return
    } else {
      setFlippingValue(value)
    }
    
    /** 获取 value 更新后元素尺寸 */
    const { offsetWidth, offsetHeight } = template.current
    setWapperStyle(Object.assign({}, wapperStyle, {
      width: offsetWidth,
      height: offsetHeight
    }))

    let startTime: number = null
    let request: number = null
    const step = (timestamp: number) => {
      context.isFlipping = true
      /** 记录动画启动时间 */
      if (!startTime) startTime = timestamp

      let currentTime = timestamp - startTime
      if (currentTime < duration) {
        /** 调用缓动函数 */
        const currentValue = easeOutQuad(currentTime, 0, 100, duration) * -1
        const newStyle = { transform: `translate3d(0, ${currentValue}%, 0)` }
        setFromStyle(Object.assign({}, fromStyle, newStyle))
        setToStyle(Object.assign({}, toStyle, newStyle))

        request = window.requestAnimationFrame(step)
      } else {
        context.isFlipping = false
        setFlippedValue(flippingValue)
        /** 调用动画结束钩子 */
        typeof handleAnimationEnd === 'function' && handleAnimationEnd()
        
        /** 精确位移数值 */
        const newStyle = { transform: `translate3d(0, 100%, 0)` }
        setFromStyle(Object.assign({}, fromStyle, newStyle))
        setToStyle(Object.assign({}, toStyle, newStyle))

        window.cancelAnimationFrame(request)

        Promise.resolve()
          .then(() => {
            /** 位移复位 */
            const newStyle = { transform: '' }
            setFromStyle(Object.assign({}, fromStyle, newStyle))
            setToStyle(Object.assign({}, toStyle, newStyle))
          })
          .then(() => {
            /** 如果在上次动画执行中有未更新的数据则再次调用动画 */
            const { waitForFlip } = context
            if (waitForFlip && waitForFlip !== flippedValue) {
              /** 获取 value 更新后元素尺寸 */
              const { offsetWidth, offsetHeight } = template.current
              setWapperStyle(Object.assign({}, wapperStyle, {
                width: offsetWidth,
                height: offsetHeight
              }))
              setFlippingValue(waitForFlip)
              context.waitForFlip = null
              
              startTime = null
              request = window.requestAnimationFrame(step)
            }
          })
      }
    }

    request = window.requestAnimationFrame(step)
  }, [value, flippingValue])
  
  return (
    <span style={wapperStyle}>
      <span className={className} style={templateStyle} ref={template}>{value}</span>
      <span className={className} style={fromStyle} ref={from}>{flippedValue}</span>
      <span className={className} style={toStyle} ref={to}>{flippingValue}</span>
    </span>
  )
}