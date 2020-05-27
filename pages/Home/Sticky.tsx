import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { classNames } from '@/utils'

import Welcome from './Welcome'

import fake_avatar from '@public/img/fake_avatar.jpg'

interface Props {
  userInfo: UserInfo
  scrollTop: number
}

interface UserInfo {
  [key: string]: any

  name: string
  avatar: string
  location: string
}

function ConnectedSticky ({ userInfo, scrollTop }: Props): JSX.Element {
  const { name, avatar, location } = userInfo
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
      <span className="sticky__user-location">{ location }</span>
    </div>
  )
}

const mapStateToProps = ({ userInfo }: any) => ({ userInfo })
const Sticky = connect(mapStateToProps)(ConnectedSticky)

export default Sticky