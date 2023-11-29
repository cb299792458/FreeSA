import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main style={{height: "100vh", width:"100vw", textAlign: "center", padding: "100px 0"}}>
      <Link href="/video/index">Videos</Link>
    </main>
  )
}
