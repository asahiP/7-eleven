import React from 'react'

import Star from './Star'

interface Props {
  review: Review
}

function frendlyTime (time: number) {
  let distance = Date.now() - time
  let minute = Math.floor(distance / 60 / 1000)
  let hour = Math.floor(minute / 60)
  let day = Math.floor(hour / 24)
  let month = Math.floor(day / 30)
  let year = Math.floor(month / 12)

  switch (true) {
    case year > 0:
      return `${year}年前`
    case month > 0:
      return `${month}月前`
    case day > 0:
      return `${day}天前`
    case hour > 0:
      return `${hour}小时前`
    case minute > 0:
      return `${minute}分钟前`
  }
}

export default function Review ({ review }: Props) {
  const { userPic, userName, time, rating, comment, pics } = review

  return (
    <div className="review__wapper">
      <div className="review__head common__clear ">
        <div className="review__icon">
          <img src={userPic} alt={userName} width="100%"/>
        </div>
        <span className="review__info">
          <span className="review__name">{userName}</span>
          <br/>
          <span className="review__time">{frendlyTime(time)}</span>
        </span>
        <Star rating={rating} className="review__star"/>
      </div>
      <p className="review__comment">{comment}</p>
      <div className="common__clear">
        {
          pics.map((pic, key) => (
            <div className="review__pic" key={key}>
              <img src={pic} alt={`comment-${key}`} width="100%"/>
            </div>
          ))
        }
      </div>
    </div>
  )
}