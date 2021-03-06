import React, { useState, useEffect, useRef } from 'react'
import { clamp } from '@/utils'

interface Props {
  children?: React.ReactNode
  onScroll?: (e: React.UIEvent, scrollLeft?: number, scrollTop?: number) => void
  className?: string
  style?: React.CSSProperties
  scrollTop?: number
  scrollLeft?: number
  resize?: number
}

export default function ScrollView ({
  children,
  onScroll: handleScroll,
  className,
  style,
  scrollTop,
  scrollLeft,
  resize
}: Props): JSX.Element {
  const wapperStyle = Object.assign({}, style, { overflow: 'hidden' })
  const [contentStyle, setContentStyle] = useState({
    overflow: 'scroll'
  } as React.CSSProperties)
  const wapper: React.MutableRefObject<HTMLDivElement> = useRef(null)
  const content: React.MutableRefObject<HTMLDivElement> = useRef(null)
  const bundle = (e: React.UIEvent) => {
    const { scrollLeft, scrollTop } = content.current
    typeof handleScroll === 'function' && handleScroll(e, scrollLeft, scrollTop)
  }

  useEffect(() => {
    const { offsetWidth, offsetHeight } = wapper.current
    
    setContentStyle(Object.assign({}, contentStyle, {
      width: offsetWidth + 20,
      height: offsetHeight + 20
    }))
  }, [resize, style])

  useEffect(() => {
    const { current } = content
    
    current.scrollLeft = clamp(scrollLeft, 0, current.scrollWidth)
  }, [scrollLeft])

  useEffect(() => {
    const { current } = content
    
    current.scrollTop = clamp(scrollTop, 0, current.scrollHeight)
  }, [scrollTop])

  return (
    <div style={wapperStyle} className={className} ref={wapper}>
      <div children={children} style={contentStyle} onScroll={bundle} ref={content}></div>
    </div>
  )
}