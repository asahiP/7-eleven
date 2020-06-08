import React, { useState, useEffect } from 'react'

import './InputSwitch.scss'
import { classNames } from '@/utils'

interface Props {
  val?: boolean
  onChange?: (val: boolean) => void
  prefix: string
  suffix: string
}

export default function InputSwitch ({
  val,
  onChange: handleChange,
  prefix,
  suffix
}: Props) {
  const [value, setValue] = useState(false)
  const handleClick = () => {
    setValue(!value)
    handleChange && handleChange(!value)
  }

  useEffect(() => {
    setValue(val)
  }, [val])

  return (
    <div className="input-switch__wapper" onClick={handleClick}>
      <div
        className={
          classNames(
            'input-switch__slider',
            { 'input-switch__slider--right': value }
          )
        }
      >
      </div>
      <span
        className={
          classNames(
            'input-switch__text',
            { 'input-switch__text--current': !value }
          )
        }
      >
        {prefix}
      </span>
      <span
        className={
          classNames(
            'input-switch__text',
            { 'input-switch__text--current': value }
          )
        }
      >
        {suffix}
      </span>
    </div>
  )
}