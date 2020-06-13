import React from 'react'

interface Props {
  text: string
  keyword: string
  className?: string
  keywordClassName?: string
}

function parsedHTML (text: string, keyword: string, className = ''): (string | JSX.Element)[] {
  let result = []
  let { length } = text
  let parts = [0, length]
  let keywords = keyword.split(/\s+/)

  if (length === 0 || keyword.length === 0) return []

  for (let i = 0; i < length; i++) {
    keywords.forEach(keyword => {
      if (keyword.length > 0 && text[i].toLocaleLowerCase() === keyword[0].toLocaleLowerCase()) {
        let
          tLen = keyword.length,
          fragment = text.slice(i, i + tLen)

        if (fragment.toLocaleLowerCase() === keyword.toLocaleLowerCase()) {
          parts.push(i, i + tLen)
          i = i + tLen - 1
        }
      }
    })
  }

  parts = Array.from(new Set(parts)).sort((a, b) => a - b)

  for (let i = 0, len = parts.length; i < len - 1; i++) {
    let fragment = text.slice(parts[i], parts[i + 1])
    const isHit = fragment.toLocaleLowerCase() === keyword.toLocaleLowerCase()
      || keywords.some(keyword => fragment.toLocaleLowerCase() === keyword.toLocaleLowerCase())
    
    if (isHit) {
      result.push((<em className={className} key={i}>{fragment}</em>))
    } else {
      result.push(fragment)
    }
  }
  return result
}

export default function Keyword ({
  text,
  keyword,
  className,
  keywordClassName
}: Props) {
  return (
    <span className={className}>
      {parsedHTML(text, keyword, keywordClassName)}
    </span>
  )
}