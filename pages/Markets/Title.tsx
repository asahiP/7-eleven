import React from 'react'

interface Props {
  title: string
}

export default function Title ({ title }: Props) {
  return (
    <div className="markets__title common__clear">
      <div className="markets__title-left">
        <div className="markets__title-dot"></div>
        <div className="markets__title-dot"></div>
        <div className="markets__title-dot"></div>
      </div>
      <span style={{ float: 'left' }}>{title}</span>
      <div className="markets__title-right">
        <div className="markets__title-dot"></div>
        <div className="markets__title-dot"></div>
        <div className="markets__title-dot"></div>
      </div>
    </div>
  )
}