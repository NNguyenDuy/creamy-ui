'use client'

import React from 'react'
import cn from 'clsx'

import './slider.scss'

export interface SliderProps {
  elements: React.ReactNode[]
  className?: string
}

export const Slider: React.FC<SliderProps> = ({ elements, className }) => {
  return (
    <div className={cn('slider-container relative', className)}>
      <div className="overlay-left" />
      <div className="slider overflow-x-auto whitespace-nowrap flex items-center">
        {elements.map((element, index) => (
          <div key={index} className="inline-block px-2">
            {element}
          </div>
        ))}
      </div>
      <div className="overlay-right" />
    </div>
  )
}
