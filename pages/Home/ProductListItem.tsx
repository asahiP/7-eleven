import React from 'react'

interface Props {
  product: Products
}

export default function ProductListItem ({ product }: Props) {
  const { pic, name, price } = product
  return (
    <div className="home__content-list-item common__nav-clear">
      <div className="home__content-list-img">
        <img src={pic} alt={name} height="100%"/>
      </div>
      <span className="home__content-list-info common__nav-clear">
        <span className="home__content-list-name">{name}</span>
        <span className="home__content-list-price">
          {price.toFixed(2)}
          <span className="home__content-list-price--before">{(price / 0.8).toFixed(2)}</span>
        </span>
      </span>
      <button className="home__content-list-add2cart"></button>
    </div>
  )
}