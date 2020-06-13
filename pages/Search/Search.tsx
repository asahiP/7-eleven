import React, { useState, useRef, useMemo } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { parseQueryString, useModel } from '@/utils'

import './Search.scss'
import Autocomplete from './Autocomplete'
import ListItemWithKeyword from './ListItemWithKeyword'
import ListItem from '@pages/Markets/ListItem'
import fakeProduct from '@/store/fakeProduct'


export default function Search () {
  const { search } = useLocation()
  const { replace, goBack } = useHistory()
  const { k } = parseQueryString(decodeURIComponent(search))
  const [keyword, syncKeyword, setKeyword] = useModel(k)
  const [active, setActive] = useState(false)
  const inputRef = useRef(null as HTMLInputElement)

  const data = useMemo(() => fakeProduct.filter(({ name }) => keyword.split(/\s+/).some(k => {
    return k.length > 0 && name.toLocaleLowerCase().includes(k.toLocaleLowerCase())
  })), [keyword])
  const filtered = useMemo(() => {
    return k
      ? fakeProduct.filter(({ name }) => k.split(/\s+/).some(k => {
        return k.length > 0 && name.toLocaleLowerCase().includes(k.toLocaleLowerCase())
      }))
      : []
  }, [k])
  const increasedResults = fakeProduct.filter(({ isHot, id }) => {
    return isHot && !filtered.some(({ id: fId }) => id === fId)
  })

  const handleSubmit = (e?: React.FormEvent) => {
    e && e.preventDefault()
    if (keyword) {
      replace('/search?k=' + keyword)
    } else {
      replace('/search')
    }
    inputRef.current.blur()
  }
  const handleChange = (val: string) => {
    setKeyword(val)
    replace('/search?k=' + val)
  }

  return (
    <>
      <div className="search__bar">
        <form className="search__form" onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              value={keyword}
              onInput={syncKeyword}
              onChange={() => {}}
              className="search__input"
              autoFocus={!k}
              onFocus={() => setActive(true)}
              onBlur={() => setActive(false)}
              ref={inputRef}
            />
            <span className="search__icon">
              <span className="common__icon common__icon--search"></span>
            </span>
          </label>
          <Autocomplete val={keyword} active={active} onChange={handleChange} data={data}/>
        </form>
        <span className="search__back" onClick={goBack}>取消</span>
      </div>
      <div className="search__result">
        { filtered.length === 0 && k && (<p className="search__title search__empty">暂无相关搜索结果</p>) }
        { filtered.length > 0 && (<p className="search__title">搜索结果</p>) }
        {
          filtered.map((product, key) => (
            <ListItemWithKeyword product={product} key={key} keyword={k || ''}/>
          ))
        }
        { increasedResults.length > 0 && (<p className="search__title">热门商品</p>) }
        {
          increasedResults.map((product, key) => (
            <ListItem product={product} key={key}/>
          ))
        }
      </div>
    </>
  )
}