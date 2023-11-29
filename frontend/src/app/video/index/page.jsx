import Link from "next/link";

export default function VideoIndex(){

    return(
        <main style={{height: "100vh", width:"100vw", textAlign: "center", padding: "100px 0"}}>
            <h1>Video Index Page</h1>
            <Link href="./1">First Video</Link><br/>
            <Link href="./2">Second Video</Link><br/>
        </main>
    )
}