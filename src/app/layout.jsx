import { Inter } from 'next/font/google'
import Link from 'next/link';
import SideBar from '@/components/sidebar/SideBar';
import Hamburger from '@/components/sidebar/Hamburger';
import logo from '../../public/Logo_Small.png';
import './globals.scss'
import './header.scss'
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FreeSA Videos',
  description: 'Watch Data Structures & Algorithms problem solutions',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="header">
          <SideBar />
          <Link id="logo-container" href="/">
            <Image id="logo" width={100} height={100} src={logo} alt=''/>
            FreeSA
          </Link>
          <Hamburger />
        </header>
        {children}
      </body>
    </html>
  )
}