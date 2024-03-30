import Link from "next/link";
import "./VideoCard.scss"


export default function VideoCard({ video, completed }){

    const { title, difficulty, num, thumbnailUrl, duration } = video;

    return(
        <Link href={`/video/${num}`}><li className="video-grid-item video-card">
            <img id="thumbnail" src={thumbnailUrl} alt={title}/>
            <p>{num +". "+title}{completed ? '✅' : ''}</p>
            <p>{difficulty} — {duration?.minutes+":"+('00'+duration?.seconds).slice(-2)}</p>
        </li></Link>
    )
}
