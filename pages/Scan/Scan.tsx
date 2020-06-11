import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import './Scan.scss'
import { $toast } from '@/components/Toast'

function getUserMedia () {
  const handle = navigator.mediaDevices && navigator.mediaDevices.getUserMedia

  if (typeof handle === 'function') {
    return handle.bind(navigator.mediaDevices)
  } else {
    return function polyfillHandle (constraints: MediaStreamConstraints) {
      const getMedia = 
        navigator.getUserMedia
        || (navigator as any).webkitGetUserMedia
        || (navigator as any).mozGetUserMedia
        || (navigator as any).msGetUserMedia

      if (!getMedia) {
        return Promise.reject(new Error('无法调用摄像头'))
      }

      return new Promise(function(resolve, reject) {
        getMedia.call(navigator, constraints, resolve, reject)
      })
    }
  }
}


export default function Scan () {
  const canvasRef = useRef(null as HTMLCanvasElement)
  const { goBack } = useHistory()

  useEffect(() => {
    const { current: canvas } = canvasRef
    const { clientWidth, clientHeight } = document.body
    
    canvas.width = clientWidth
    canvas.height = clientHeight

    const video = document.createElement('video')
    const ctx = canvas.getContext('2d')
    let request: number
    let streamRef: MediaStream
    const handleCameraAnimationFrame = () => {
      ctx.drawImage(
        video,
        0,
        0,
        video.videoWidth * (clientHeight / video.videoHeight),
        clientHeight
      )
      request = window.requestAnimationFrame(handleCameraAnimationFrame)
    }

    const constraints: MediaStreamConstraints = {
      video: {
        facingMode: 'environment'
      },
      audio: false
    }
    getUserMedia()(constraints)
      .then((stream: MediaStream ) => {
        if ("srcObject" in video) {
          video.srcObject = stream
        } else {
          (video as HTMLVideoElement).src = window.URL.createObjectURL(stream)
        }
        video.onloadedmetadata = () => {
          video.play()
          request = window.requestAnimationFrame(handleCameraAnimationFrame)
        }
        streamRef = stream
      })
      .catch((e: any) => {
        $toast(e.toString())
        console.log(e)
      })
    
    return () => {
      video.pause()
      video.srcObject = null
      video.src = null
      window.cancelAnimationFrame(request)
      streamRef && streamRef.getTracks()[0].stop()
    }
  }, [])

  return (
    <div className="scan__wapper">
      <canvas ref={canvasRef}></canvas>
      <div className="scan__qrcode scan__rect">
        <div className="common__qrcod-corner"></div>
        <div className="common__qrcod-corner"></div>
        <div className="common__qrcod-corner"></div>
        <div className="common__qrcod-corner"></div>
        <div className="scan__slider"></div>
      </div>
      <span className="common__back" onClick={goBack}>
        <span className="common__icon common__icon--arrow-left"></span>
      </span>
      <span className="scan__description">扫描二维码 / 条形码</span>
    </div>
  )
}