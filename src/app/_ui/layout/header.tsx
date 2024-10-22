'use client'

import { CardVideo } from '@/shared/features/card-video'
import { Donut3D } from '@/shared/features/components/donut-3d'
import { FallingText } from '@/shared/features/falling-text'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export const Header = () => {
  const pathname = usePathname()

  useEffect(() => {}, [pathname])

  if (pathname !== '/') {
    return null
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 justify-between items-end m-4 gap-4">
      <div className="flex max-w-[350px] flex-col items-start gap-6 py-16 relative">
        <div className="flex flex-col ">
          <h1 className="text-2xl font-medium leading-tight text-t-gray">
            Creamy
          </h1>
          <p className="text-2xl font-medium leading-[1.15]">
            Provide components the best of the best for web design.
          </p>
        </div>
        <div className="flex justify-center items-center gap-4">
          <button className="rounded-lg bg-primary hover:opacity-85 text-white p-2 px-3 font-medium">
            Login
          </button>
          <span className="text-t-gray">to premium ?</span>
        </div>
        <div className="text-t-gray">
          <FallingText
            text="Pay to use VIP components"
            delaysText={0.3}
            elements={
              <span key="1" className="text-red-500">
                &#x2764;
              </span>
            }
          />
        </div>
        <Donut3D />
      </div>
      <div className="col-span-1 xl:col-span-2">
        <CardVideo url="https://cdn.godly.website/videos/640/40dd5971-e408-42f3-9fb1-50da0571356d.mp4" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
        <CardVideo />
        <CardVideo />
      </div>
    </section>
  )
}
