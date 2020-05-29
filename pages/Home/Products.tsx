import React, { useState } from 'react'

import ProductsItem from './ProductsItem'
import Slideshow from '@/components/Slideshow'

import fakeProduct from '@/store/fakeProduct'

interface Props {
  products?: Products[]
}


export default function Products ({ products }: Props) {
  const [index, setIndex] = useState(1)
  return (
    <Slideshow className="products__wapper" onIndexChange={setIndex} index={1}>
      {
        fakeProduct.slice(3, 9).reverse().map((item, key) => {
          return <ProductsItem item={item} key={key} index={key} current={index}/>
        })
      }
    </Slideshow>
  )
}