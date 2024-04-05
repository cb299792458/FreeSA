import { Inter } from 'next/font/google'
import Link from 'next/link';
import SideBar from '@/components/sidebar/SideBar';
import Hamburger from '@/components/sidebar/Hamburger';
import logo from '../../public/FreeSA-sm.png';
import '/src/styles/globals.scss';
import '/src/styles/header.scss';
import Image from 'next/image';
import { getServerSession } from "next-auth";
import SessionProvider from '@/components/SessionProvider';
import NavBar from '@/components/nav/Nav';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'FreeSA Videos',
    description: 'Watch Data Structures & Algorithms problem solutions',
}

export default async function RootLayout({ children }) {
    const session = await getServerSession();

    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider session={session}>
                    <header className="header">
                        <div id="logo-container">
                            <Link id="logo-link" href="/">
                                <Image id="logo" src={logo} alt=''/>
                            </Link>
                            <p id="us">{'Created By: '}
                                <a href="https://www.linkedin.com/in/brian-lam-software-developer/">Brian Lam</a> 
                                {' and '} 
                                <a href="https://www.linkedin.com/in/clarence-smith-nyc/">Clarence Smith</a>
                            </p>
                        </div>
                            <NavBar />
                    </header>
                    {children}
                </SessionProvider>
            </body>
        </html>
    )
}
