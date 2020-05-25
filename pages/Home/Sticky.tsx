import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { classNames } from '@/utils'

import Welcome from './Welcome'
import Search from '@/components/Search'

import fake_avatar from '@public/img/fake_avatar.jpg'

function ConnectedSticky ({ userInfo, scrollTop }: any): JSX.Element {
  const { name, avatar } = userInfo
  const [wapperClassName, setWapperClassName] = useState('sticky__wapper')
  const wapper = useRef(null)
  const wapperHeight = useRef(0)

  useEffect(() => { wapperHeight.current = wapper.current.offsetHeight }, [])
  useEffect(() => {
    setWapperClassName(
      classNames({
        'sticky__wapper': true,
        'sticky__wapper--is-sticky': scrollTop > wapperHeight.current
      })
    )
  }, [scrollTop])

  return (
    <div className={wapperClassName} ref={wapper}>
      <Link className="sticky__user-icon" to="/">
        {/* <img src={avatar} alt="user icon" width="50"/> */}
        <img src={fake_avatar} alt="user icon" width="50"/>
      </Link>
      <Welcome name={name}/>
      <span className="sticky__user-location">{ userInfo.location }</span>
      <Search className="sticky__search" onSubmit={(e: any, t: any) => console.log(t)}/>
    </div>
  )
}

const mapStateToProps = ({ userInfo }: any) => ({ userInfo })
const Sticky = connect(mapStateToProps)(ConnectedSticky)

export default Sticky