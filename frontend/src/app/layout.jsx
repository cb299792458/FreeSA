import { Inter } from 'next/font/google'
import Link from 'next/link';
import SideBar from '@/components/sidebar/SideBar';
import Hamburger from '@/components/sidebar/Hamburger';
import './globals.scss'
import './header.scss'

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
                    <img id="logo" src='https://trnkt-dev.s3.amazonaws.com/Logo_Small.png'/>
                    FreeSA
                </Link>
                <Hamburger />
            </header>
            {children}
        </body>
        </html>
    )
}