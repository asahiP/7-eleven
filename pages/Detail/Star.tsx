import React, { useRef, useState, useEffect } from 'react'
import { range } from '@/utils'

interface Props {
  rating: number
  className?: string
}

export default function Star ({ rating, className }: Props) {
  const total = useRef(null as HTMLDivElement)
  const [wapperStyle, setWapperStyle] = useState({} as React.CSSProperties)
  const [currentStyle, setCurrentStyle] = useState({} as React.CSSProperties)

  useEffect(() => {
    const { width } = total.current.getBoundingClientRect()
    setWapperStyle({ width })
    setCurrentStyle({
      width: width * (rating / 5)
    })
  }, [])
  return (
    <div className={className} style={wapperStyle}>
      <div className="star__rating" ref={total}>
        {
        range(5).map((omit, key) => (
          <span className="common__icon common__icon--star" key={key}></span>
        ))
        }
      </div>
      <div className="star__rating--current" style={currentStyle}>
        {
        range(5).map((omit, key) => (
          <span className="common__icon common__icon--star" key={key}></span>
        ))
        }
      </div>
    </div>
  )
}