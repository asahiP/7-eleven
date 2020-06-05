import React from 'react'
import ReactDOM from 'react-dom'

import './Toast.scss'

let timer: any = null
const duration = 1250 + 500

export function $toast (msg: string) {
  if (!timer) {
    const container = document.createElement('div')
    const content = (
      <div className="toast__position">
        <div className="toast">{msg}</div>
      </div>
    )
  
    document.body.appendChild(container)
    ReactDOM.render(content, container)
  
    timer = setTimeout(() => {
      ReactDOM.unmountComponentAtNode(container)
      document.body.removeChild(container)
      timer = null
    }, duration)
  }
}