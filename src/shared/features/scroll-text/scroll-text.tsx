'use client'

import React from 'react'
import cn from 'clsx'

import './scroll-text.scss'

export interface SliderProps {
  text?: string
  className?: string
}

export const ScrollText: React.FC<SliderProps> = ({ text, className }) => {
  return <p className={cn('scroll-text select-none', className)}>{text}</p>
}
