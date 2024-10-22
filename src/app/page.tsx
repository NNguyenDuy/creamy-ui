import { Slider } from '@/shared/features/slider'
import Link from 'next/link'
import { Icons } from './_ui/icons'
import { ScrollText } from '@/shared/features/scroll-text'

const elements = [
  {
    path: '/ai',
    icon: <Icons.Air size={24} />,
    title: 'AI',
  },
  {
    path: '/web3',
    icon: <Icons.Air size={24} />,
    title: 'Web3',
  },
  {
    path: '/portfolios',
    icon: <Icons.Air size={24} />,
    title: 'Portfolios',
  },
  {
    path: '/ai',
    icon: <Icons.Air size={24} />,
    title: 'AI',
  },
  {
    path: '/web3',
    icon: <Icons.Air size={24} />,
    title: 'Web3',
  },
  {
    path: '/portfolios',
    icon: <Icons.Air size={24} />,
    title: 'Portfolios',
  },
  {
    path: '/ai',
    icon: <Icons.Air size={24} />,
    title: 'AI',
  },
  {
    path: '/web3',
    icon: <Icons.Air size={24} />,
    title: 'Web3',
  },
  {
    path: '/portfolios',
    icon: <Icons.Air size={24} />,
    title: 'Portfolios',
  },
  {
    path: '/ai',
    icon: <Icons.Air size={24} />,
    title: 'AI',
  },
  {
    path: '/web3',
    icon: <Icons.Air size={24} />,
    title: 'Web3',
  },
  {
    path: '/portfolios',
    icon: <Icons.Air size={24} />,
    title: 'Portfolios',
  },
  {
    path: '/ai',
    icon: <Icons.Air size={24} />,
    title: 'AI',
  },
  {
    path: '/web3',
    icon: <Icons.Air size={24} />,
    title: 'Web3',
  },
  {
    path: '/portfolios',
    icon: <Icons.Air size={24} />,
    title: 'Portfolios',
  },
  {
    path: '/all',
    title: 'All',
  },
]

export default function Home() {
  return (
    <div>
      <div className="flex items-center gap-5">
        <div className="absolute bottom-24 right-10 translate-y-1/2">
          <ScrollText
            text="The Creamy"
            className="text-5xl md:text-7xl xl:text-9xl text-gray-50"
          />
        </div>
        <div
          key={3}
          className="flex gap-1 rounded-3xl opacity-75 hover:opacity-95 cursor-pointer font-medium justify-center items-center px-3 border border-b-gray py-2 select-none"
        >
          <span>i3</span>
          <span>Filter</span>
          <span className="bg-secondary px-2 text-t-gray rounded-full">0</span>
        </div>
        <Slider
          elements={elements.map(({ icon, title, path }) => (
            <Link
              href={path}
              key={path}
              className="flex gap-2 duration-300 rounded-3xl opacity-75 hover:opacity-100 hover:text-primary cursor-pointer font-medium justify-center items-center bg-secondary px-3 text-t-gray py-2"
            >
              {icon}
              <span>{title}</span>
            </Link>
          ))}
          className="flex gap-2 items-center h-16"
        />
      </div>
      <section className="h-screen">test</section>
    </div>
  )
}
