import React, { useState } from 'react'

export function useModel (initialValue = ''): [string, (e: any) => void, (e: string) => void] {
  const [val, setVal] = useState(initialValue)
  const bundle = (e: any) => setVal((e.target as HTMLInputElement).value)

  return [val, bundle, setVal]
}

export function classNames(...classes: any): string {
  return [...new Set(
    classes
      .flat(Infinity)
      .filter((item: any) => item)
      .map((item: any) => (
        typeof item === 'object'
          ? Object.entries(item)
            .filter(([key, val]) => val)
            .map(([key, val]) => key)
          : item
      ))
      .flat(Infinity)
  )].join(' ')
}


export function debounce (fn: Function, delay: number): (...args: any) => Promise<any> {
  let timer: any
  return function bundle (...args: any) {
    const context = this
    clearTimeout(timer)

    return new Promise((res, rej) => {
      timer = setTimeout(() => {
        res(fn.apply(context, args))
      }, delay)

    })
  }
}

export function throttle (fn: Function, delay: number): (...args: any) => any {
  let previous: number = null
  return function bundle (...args: any) {
    const context = this
    const now = Date.now()

    return new Promise((res, rej) => {
      if (now - previous > delay) {
        previous = now
        res(fn.apply(context, args))
      }
    })
  }
}


/**
 * 当参数数量为 1 时，参数为最大值；
 *             2 时，参数为最小值，最大值；
 *             3 时，参数为最小值，最大值，步进值。
 * 前两个参数会被重新排序，确保参数1必然小于参数2
 */
export function range (...args: number[]): number[] {
  let min: number, max: number, step: number, len: number

  switch (args.length) {
    case 1:
      [max] = args
      return [...Array(
        /** max不为整数时长度进 1 */
        max % 1 === 0 ? max : Math.floor(max) + 1
      ).keys()]
    case 2:
      /** 大小值排序 */
      [min, max] = args.slice(0, 2).sort((a, b) => a - b)
      len = max - min
      return [...Array(
        /** 除不尽时长度进 1 */
        len % 1 === 0 ? len : Math.floor(len) + 1
      ).keys()].map(i => i + min)
    case 3:
      /** 大小值排序 */
      [min, max] = args.slice(0, 2).sort((a, b) => a - b)
      step = args[2]

      /** 步进值为 0 时，跳出 */
      if (step === 0) return range(min, max)
      /** 当步进值为负数时，作翻转处理 */
      if (step < 0) return range(min, max, Math.abs(step)).reverse()

      /** 步进值取绝对值 */
      step = Math.abs(step)
      /** 数组长度计算 */
      len = (max - min) / step
      return [...Array(
        /** 除不尽时长度进 1 */
        len % 1 === 0 ? len : Math.floor(len) + 1
      ).keys()].map((item, index) => {
        /** 步进值不是整数时做精度处理 */
        return step % 1 === 0
        ? min + step * index
        : parseFloat(
          /** 取步进值右边小数位数为 precision 参数值 */
          (min + step * index).toFixed(step.toString().split('.')[1].length)
        )
      })
  }
}

export function characterRange (start: string, end: string): string[] {
  let [min, max] = [start ,end]
    /** 转换Unicode */
    .map(i => i.charCodeAt(0))
    /** 重新排序 */
    .sort((a, b) => a - b)

  return range(min, max + 1)
    /** 遍历数组并返回字符串 */
    .map(i => String.fromCharCode(i))
}

export function getRandStr (len: number) {
  let seed = 'abcdefghijklmnoprstuvwxyz'
    + '0123456789'
  let sLen = seed.length  
  let result = ''

  while (len--) {
    let part = seed[Math.floor(Math.random() * sLen)]
    result += Math.random() > 0.5
      ? part
      : part.toUpperCase()
  }

  return result
}

export function random (arr: any[]): any {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function shuffle (arr: any[]): any[] {
  const copy = arr.concat()
  let len = copy.length

  while (len) {
    const random = Math.floor(Math.random() * len--);
    [copy[len], copy[random]] = [copy[random], copy[len]]
  }

  return copy
}

export function clamp (val: number, min: number, max: number): number {
  return Math.min(max, Math.max(val, min))
}

export function deepCompare (ref: any, val: any): boolean {
  const isArr = Array.isArray
  const isObj = (val: any) => typeof val === 'object' && val !== null
  if (isArr(ref)) {
    if (isArr(val)) {
      let rLen = ref.length
      let vLen = val.length

      if (rLen === vLen) {
        for (let i = 0; i < rLen; i++) {
          if (!deepCompare(ref[i], val[i])) {
            return false
          }
        }
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  } else if (isObj(ref)) {
    if (isObj(val)) {
      let rKeys = Object.keys(ref)
      let vKeys = Object.keys(val)
      let keySet = new Set([...rKeys, ...vKeys])
      let rLen = rKeys.length
      let vLen = vKeys.length
      let kLen = keySet.size

      if (rLen === vLen && rLen === kLen) {
        for (let i = 0; i < rLen; i++) {
          let key = rKeys[i]
          if (!deepCompare(ref[key], val[key])) {
            return false
          }
        }
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  } else if (isNaN(ref)) {
    return isNaN(val)
  }

  return ref === val
}

export function getAttribute (element: any, attributeName: string): string {
  let result: string = null

  while (
    element.getAttribute
    && !(result = element.getAttribute(attributeName))
    && element.parentNode
  ) {
    element = element.parentNode
  }

  return result
}