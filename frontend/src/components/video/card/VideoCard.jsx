import Link from "next/link";
import "./VideoCard.scss"


export default function VideoCard({ video }){

    const { title, difficulty, num, thumbnailUrl, duration } = video;
    

    return(
        <li className="video-grid-item video-card">
            <img id="thumbnail" src={thumbnailUrl} />
            <Link href={`/video/${num}`}>{num +". "+title}</Link>
            <p>{difficulty} — {duration.minutes+":"+duration.seconds}</p>
        </li>
    )
}