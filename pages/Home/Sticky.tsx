import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import fake_avatar from '@public/img/fake_avatar.jpg'

import Welcome from './Welcome'
import Search from '@/components/Search'


function ConnectedSticky ({ userInfo }: any): JSX.Element {
  const { name, avatar } = userInfo
  return (
    <div className="sticky__wapper">
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