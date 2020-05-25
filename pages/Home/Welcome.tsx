import React from 'react'

export default function Welcome ({ name }: any): JSX.Element {
  const morning = '早上好'
  const noon = '中午好'
  const afternoon = '下午好'
  const night = '晚上好'
  const now = new Date().getHours()

  let hitedInfo = ''

  switch (true) {
    case now >= 7 && now <= 12:
      hitedInfo = morning
      break
    case now === 12:
      hitedInfo = noon
      break
    case now >= 13 && now <= 18:
      hitedInfo = afternoon
      break
    case now >= 19 || now <= 6:
      hitedInfo = night
      break
  }
  
  return (
    <span className="sticky__user-info">{`${hitedInfo}，${name}`}</span>
  )
}