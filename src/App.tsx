import React from 'react'


export default function App (): JSX.Element {
  const isMobile = navigator.userAgent.toLocaleLowerCase().includes('mobile')

  if (isMobile) {
    location.replace(location.href + 'iframe/index.html')
  }

  return (
    <div className="wapper">
      <div style={{ position: 'relative', zIndex: 999 }}>
        <div className="button"></div>
        <div className="button"></div>
        <iframe
          className="mobile"
          src="iframe/index.html"
          width="284"
          height="568"
          frameBorder="0"
        ></iframe>
      </div>
      <div className="corner">
        <p><a href="https://github.com/asahiP" target="_Blank">@Luke Pan</a>{' / '}<a href="https://github.com/asahiP/7-eleven" target="_Blank">Github</a></p>
        <p>建议使用手机浏览，获取最佳体验</p>
      </div>
    </div>
  )
}