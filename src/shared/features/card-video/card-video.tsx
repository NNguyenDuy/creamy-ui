import React, { FC } from 'react'
import cn from 'clsx'

interface I_CardVideoProps {
  url?: string
  className?: string
}

export const CardVideo: FC<I_CardVideoProps> = ({ url, className }) => {
  return (
    <div
      className={cn(
        'border border-slate-200 w-full h-full bg-slate-50 cursor-pointer',
        className
      )}
    >
      <video
        className="object-cover w-full h-full aspect-video filter brightness-100 hover:brightness-90 transition-all duration-300"
        src={url}
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  )
}
