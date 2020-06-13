import React, { useState, useEffect, useMemo } from 'react'
import { classNames, getAttribute } from '@/utils'

import ScrollView from '@/components/ScrollView'
import Keyword from '@/components/Keyword'


interface Props {
  val: string
  active: boolean
  onChange: (val: string) => void
  data: Products[]
}

export default function Autocomplete ({
  val,
  active,
  onChange: handleChange,
  data
}: Props) {
  const [resize, setResize] = useState(0)
  const filtered = data.map(({ name }) => name)

  const handleClick = (e: React.UIEvent) => {
    const val = getAttribute(e.target, 'data-name')
    val && handleChange(val)
  }

  useEffect(() => setResize(Date.now()), [val])
  return (
    <div
      className={
        classNames(
          'autocomplete__wapper',
          { 'autocomplete__wapper--active': val && filtered.length && active }
        )
      }
    >
      <ScrollView
        resize={resize}
        className="autocomplete__scroll"
        style={{ height: `${9 * filtered.length}vw` }}
      >
        <div className="autocomplete__list" onClick={handleClick}>
          {
            filtered.map((name, key) => {
              return (
                <div key={key} className="autocomplete__list-item" data-name={name}>
                  <Keyword text={name} keyword={val} keywordClassName="search__keyword"/>
                </div>
              )
            })
          }
        </div>
      </ScrollView>
    </div>
  )
}