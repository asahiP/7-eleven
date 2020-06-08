import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { addToCart } from '@/actions'
import { $toast } from '@/components/Toast'

interface Props {
  product: Products
  addToCart: (id: number) => void
}

function connectedProductListItem ({ product, addToCart }: Props) {
  const { pic, name, price, id } = product
  const handleClick = () => {
    addToCart(id)
    $toast('已添加到购物车')
  }
  return (
    <div className="home__content-list-item common__nav-clear">
      <Link to={`/detail/${id}`}>
        <div className="home__content-list-img">
          <img src={pic} alt={name} height="100%"/>
        </div>
      </Link>
      <span className="home__content-list-info common__nav-clear">
        <span className="home__content-list-name">{name}</span>
        <span className="home__content-list-price">
          {price.toFixed(2)}
          <span className="home__content-list-price--before">{(price / 0.8).toFixed(2)}</span>
        </span>
      </span>
      <button className="common__increase" onClick={handleClick}></button>
    </div>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  addToCart: (id: number) => dispatch(addToCart(id))
})
const ProductListItem = connect(null, mapDispatchToProps)(connectedProductListItem)
export default ProductListItem