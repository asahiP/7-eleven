import React from 'react'

import ProductListItem from './ProductListItem'

interface Props {
  products: Products[]
}

export default function ProductList ({ products }: Props) {
  return (
    <div className="home__content-list">
      {
        products.map((item, key) => (
          <ProductListItem product={item} key={key} />
        ))
      }
    </div>
  )
}