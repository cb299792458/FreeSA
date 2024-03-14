import { Inter } from 'next/font/google'
import Link from 'next/link';
import SideBar from '@/components/sidebar/SideBar';
import Hamburger from '@/components/sidebar/Hamburger';
import logo from '../../public/Logo_Small.png';
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
                <header className="header">
                    <SideBar />
                    <Link id="logo-container" href="/">
                        <Image id="logo" width={100} height={100} src={logo} alt=''/>
                        FreeSA
                    </Link>
                    <Hamburger />
                </header>
                <SessionProvider session={session}>
                    <NavBar />
                    {children}
                </SessionProvider>
            </body>
        </html>
    )
}
