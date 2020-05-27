import React, { useState, useEffect, useRef } from 'react'

interface Props {
  children: React.ReactChild
  onScroll?: (e: React.UIEvent) => void
  className?: string
}

export default function ScrollView ({
  children,
  onScroll: handleScroll,
  className
}: Props): JSX.Element {
  const wapperStyle = { overflow: 'hidden' }
  const [contentStyle, setContentStyle] = useState({
    overflow: 'scroll'
  })
  const wapper = useRef(null)

  useEffect(() => {
    const { offsetWidth, offsetHeight } = wapper.current as HTMLElement
    
    setContentStyle(Object.assign({}, contentStyle, {
      width: offsetWidth + 20,
      height: offsetHeight + 20
    }))
  }, [])
  return (
    <div style={wapperStyle} className={className} ref={wapper}>
      <div children={children} style={contentStyle} onScroll={handleScroll}></div>
    </div>
  )
}