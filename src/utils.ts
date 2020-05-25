import React, { useState } from 'react'

export function useModel (initialValue = ''): [string, (e: any) => void, (e: string) => void] {
  const [val, setVal] = useState(initialValue)
  const bundle = (e: any) => setVal((e.target as HTMLInputElement).value)

  return [val, bundle, setVal]
}

export function classNames(classes: {[key: string]: boolean}) {
  return Object.entries(classes)
    .filter(([key, value]) => value)
    .map(([key, value]) => key)
    .join(' ');
}