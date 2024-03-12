import Link from "next/link";
import "./VideoCard.scss"


export default function VideoCard({ video, completed }){

    const { title, difficulty, num, thumbnailUrl, duration } = video;

    return(
        <li className="video-grid-item video-card">
            <img id="thumbnail" src={thumbnailUrl} alt={title}/>
            <Link href={`/video/${num}`}>{num +". "+title}</Link>{completed ? '✅' : ''}
            <p>{difficulty} — {duration?.minutes+":"+('00'+duration?.seconds).slice(-2)}</p>
        </li>
    )
}
