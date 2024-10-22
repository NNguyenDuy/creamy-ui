import React from 'react'
import { Icons } from '../icons'
import Link from 'next/link'
import cn from 'clsx'

interface I_NavItem {
  path: string
  content: React.ReactNode | string
}

export const NavBar = () => {
  const navItems: I_NavItem[] = [
    {
      path: '/',
      content: <Icons.Logo size={22} />,
    },
    {
      path: '/component',
      content: 'Component',
    },
    {
      path: '/info',
      content: 'Info',
    },
  ]

  return (
    <header className="fixed w-full justify-center z-50 flex bottom-6">
      <div className="text-t-gray select-none font-medium text-sm px-4 py-3 backdrop-blur-lg bg-neutral-300/50 rounded-full opacity-80">
        <nav className="gap-2 flex justify-center items-center">
          {navItems.map((item, index) => (
            <Link
              className={cn(
                'hover:text-primary duration-300',
                item.path === '/' ? 'text-black -mt-1' : ''
              )}
              href={item.path}
              key={index}
            >
              {item.content}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
