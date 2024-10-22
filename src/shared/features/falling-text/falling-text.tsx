import React from 'react'
import './falling-text.scss'
import cn from 'clsx'

interface I_FallingTextProps {
  text: string
  delaysText?: number
  elements?: React.ReactNode
  className?: string
}

export const FallingText: React.FC<I_FallingTextProps> = ({
  text,
  delaysText = 0.1,
  elements,
  className,
}) => {
  const words = text.split(' ')

  const animationDelays = words.map(
    (_, index) => `${(index + 1) * delaysText}s`
  )

  return (
    <p className={cn('falling-text', className)}>
      {words.map((word, index) => (
        <span key={index} style={{ animationDelay: animationDelays[index] }}>
          {word}
          <span>&nbsp;</span>
        </span>
      ))}
      {elements}
    </p>
  )
}
