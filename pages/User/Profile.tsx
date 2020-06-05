import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { $toast } from '@/components/Toast'


interface Props {
  userInfo: UserInfo
}

interface UserInfo {
  name: string
  avatar: string
  location: string
  description: string
  point: number
  balance: number
  history: any[]
}

function ConnectedProfile ({
  userInfo
}: Props) {
  const { goBack } = useHistory()
  const { name, avatar, description, point, balance } = userInfo
  return (
    <div className="profile__wapper">
      <span className="common__back" onClick={goBack}>
        <span className="common__icon common__icon--arrow-left"></span>
      </span>
      <span className="common__settings" onClick={() => $toast('正在施工中')}>
        <span className="common__icon common__icon--settings"></span>
      </span>
      <div className="profile__avatar">
        <img src={avatar} alt={name} width="100%"/>
      </div>
      <span className="profile__name">{name}</span>
      <span className="profile__description">{description}</span>
      <div className="profile__box">
        <div className="profile__box-item">
          <span className="profile__point">
            {point}
            <span className="profile__point-arrow">
              <span className="common__icon common__icon--arrow-top"></span>
            </span>
          </span>
          <span className="profile__box-title">积分</span>
        </div>
        <div className="profile__box-item">
          <span className="profile__balance">
            {balance}
          </span>
          <span className="profile__box-title">余额</span>
        </div>
        <div className="profile__box-item">
          <span className="profile__history">
            {24}
          </span>
          <span className="profile__box-title">足迹</span>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ userInfo }: any) => ({ userInfo })
const Profile = connect(mapStateToProps)(ConnectedProfile)

export default Profile