import React, { useRef, useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { productMap } from '@/store/fakeProduct'

import Flipping from '@/components/Flipping'
import ScrollView from '@/components/ScrollView'

interface Props {
  cart: number[]
  mapCartToCount: { [key: string]: number }
  onClick?: (e: React.UIEvent) => void
}
function connectedCartMini ({
  cart,
  mapCartToCount,
  onClick: handleClick
}: Props) {
  const totalPrice = cart.reduce((prev: number, current) => {
    const { price } = productMap[current]
    return prev + (price * mapCartToCount[current])
  }, 0)
  const content = useRef(null as HTMLDivElement)
  const [contentStyle, setContentStyle] = useState({} as React.CSSProperties)
  const [scrollLeft, setScrollLeft] = useState(0)
  
  useEffect(() => {
    setTimeout(() => {
      const { current } = content
      const { 0: child } = current.children
  
      if (child) {
        const { offsetWidth, offsetHeight } = child as any
        setContentStyle({
          position: 'relative',
          top: '9.583vw',
          width: offsetWidth * cart.length + 25,
          height: offsetHeight,
          overflow: 'hidden',
          transform: 'translate3d(0, -50%, 0)'
        })
        setScrollLeft(Date.now())
      }
    })
  }, [cart])
  return (
    <div className="markets__mini" onClick={handleClick}>
      <div className="markets__mini-count">
        <Flipping value={cart.length}/>
      </div>
      <ScrollView className="markets__mini-list" scrollLeft={scrollLeft}>
        <div ref={content} style={contentStyle}>
          {
            cart.map((id, key) => {
              const { pic, name } = productMap[id]
              return (
                <div className="markets__mini-item" key={key}>
                  <div>
                    <img src={pic} alt={name} width="100%"/>
                  </div>
                </div>
              )
            })
          }
        </div>
      </ScrollView>
      <span className="markets__mini-price">
        <span>总计：</span>
        <Flipping value={totalPrice.toFixed(2)}/>
      </span>
      <span className="markets__mini-price--before">
        <span>折扣前：</span>
        <span>
          {(totalPrice / 0.8).toFixed(2)}
        </span>
      </span>
    </div>
  )
}

const mapStateToProps = ({ cart, mapCartToCount }: any) => ({ cart, mapCartToCount })

const CartMini = connect(mapStateToProps)(connectedCartMini)
export default CartMini