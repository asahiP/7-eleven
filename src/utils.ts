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

export function debounce (fn: Function, delay: number): (...args: any) => void {
  let timer: any
  return function bundle (...args: any) {
    const context = this
    clearTimeout(timer)
    timer = setTimeout(fn.bind(context, ...args), delay)
  }
}

export function throttle (fn: Function, delay: number): (...args: any) => void {
  let previous: number = null
  return function bundle (...args: any) {
    const context = this
    const now = Date.now()

    if (now - previous > delay) {
      fn.apply(context, args)
      previous = now
    }
  }
}