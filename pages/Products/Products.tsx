import React, { useMemo } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import './Products.scss'

export default function Products () {
  const { pathname } = useLocation()
  const { push } = useHistory()
  const isCartPage = useMemo(() => pathname === '/cart', [pathname])
  return (
    <>

    </>
  )
}