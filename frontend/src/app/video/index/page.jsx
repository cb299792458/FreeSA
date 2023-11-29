import Link from "next/link";

export default function VideoIndex(){
    const listItemStyle = {listStylePosition: "inside", textAlign: "left", marginBottom: "10px"};
    return(
        <main style={{height: "100vh", width:"100vw", textAlign: "center"}}>
            <h1>Video Index Page</h1>
            <ol style={{width: "fit-content", margin: "0 auto"}}>
                <li style={listItemStyle}><Link href="./1">First Video</Link></li>
                <li style={listItemStyle}><Link href="./2">Second Video</Link></li>
            </ol>
        </main>
    )
}