import React, { useState, useRef } from 'react'
import './Search.scss'
import { classNames, useModel } from '@/utils'

export default function Search ({ className, onSubmit: handleSubmit, placeholder, style }: any): JSX.Element {
  const [isFocus, setIsFocus] = useState(false)
  const assignedClassName = classNames(
    'common__search-wapper',
    { 'common__search-wapper--is-focus': isFocus },
    className
  )
  
  const input = useRef(null)
  const [keyWord, syncKeyword, setKeyword] = useModel()
  const bundleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    typeof handleSubmit === 'function' && handleSubmit(keyWord, input.current)
  }
  const handleClick = () => setIsFocus(true)
  const handleBlur = () => {
    setKeyword('')
    setIsFocus(false)
  }

  return (
    <label className={assignedClassName} onClick={handleClick} style={style}>
      <form onSubmit={bundleSubmit}>
        <input
          ref={input}
          type="text"
          onChange={syncKeyword}
          onBlur={handleBlur}
          value={keyWord}
          placeholder={placeholder}
          className="common__search-input"
        />
      </form>
      <span className="common__icon common__icon--search common__search-icon"></span>
    </label>
  )
}