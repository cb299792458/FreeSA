import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main style={{height: "100%", width:"100%", textAlign: "center"}}>
      <h1><Link href="/video/index">Videos</Link></h1>
    </main>
  )
}
