import React from 'react'
import { classNames } from '@/utils'

interface Props {
  isSelfFetch?: boolean
  delay?: number[]
  canHeating?: boolean
  className?: string
}

export default function Status ({
  isSelfFetch,
  delay,
  canHeating,
  className,
}: Props) {
  return (
    <span className={classNames('status', className)}>
      <span className="common__icon common__icon--lightning status-icon--lightning"></span>
      {' ' + isSelfFetch ? '到店取餐' : '外卖配送'}
      <span className="common__icon common__icon--time status-icon--time"></span>
      {' ' + (delay ? `${delay[0]}~${delay[1]}min` : '即到即食')}
      {
        canHeating
          ? (
            <>
            <span className="common__icon common__icon--heating status-icon--heating"></span>
            {' '}
            <span>支持加热</span>
            </>
          )
          : ''
      }
  </span>
  )
}