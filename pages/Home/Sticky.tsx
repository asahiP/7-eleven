import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { classNames } from '@/utils'

import Welcome from './Welcome'

import fake_avatar from '@public/img/fake_avatar.jpg'

function ConnectedSticky ({ userInfo, scrollTop }: any): JSX.Element {
  const { name, avatar } = userInfo
  const [wapperClassName, setWapperClassName] = useState('sticky__wapper')
  const wapper = useRef(null)
  const wapperHeight = useRef(0)

  useEffect(() => { wapperHeight.current = wapper.current.offsetHeight }, [])
  useEffect(() => {
    setWapperClassName(
      classNames(
        'sticky__wapper',
        { 'sticky__wapper--is-sticky': scrollTop > wapperHeight.current }
      )
    )
  }, [scrollTop])

  return (
    <div className={wapperClassName} ref={wapper}>
      <Link className="sticky__user-icon" to="/">
        {/* <img src={avatar} alt="user icon" width="100%"/> */}
        <img src={fake_avatar} alt="user icon" width="100%"/>
      </Link>
      <Welcome name={name}/>
      <span className="sticky__user-location">{ userInfo.location }</span>
    </div>
  )
}

const mapStateToProps = ({ userInfo }: any) => ({ userInfo })
const Sticky = connect(mapStateToProps)(ConnectedSticky)

export default Sticky