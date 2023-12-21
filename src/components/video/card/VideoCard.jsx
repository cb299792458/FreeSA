import Link from "next/link";
import "./VideoCard.scss"


export default function VideoCard({ video }){

    const { title, difficulty, num } = video;

    return(
        <li id="video-card">
            <div>Screenshot</div>
            <Link href={`/video/${num}`}>{num +". "+title}</Link>
            <p>{difficulty}</p>
        </li>
    )
}