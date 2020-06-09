import React from 'react'
import { useParams } from 'react-router-dom'

import './Code.scss'

export default function Code () {
  const { id } = useParams()
  console.log(id)
  return (
    <>
    </>
  )
}