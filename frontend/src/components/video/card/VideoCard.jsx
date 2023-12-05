import Link from "next/link";
import "./VideoCard.scss"


export default async function VideoCard({ video }){

    const { title, difficulty, num } = video;
    
    const { google } = require('googleapis');
    const td = require('tinyduration');

    const youtube = google.youtube({
        version: 'v3',
        auth: process.env.REACT_APP_YOUTUBE_API_KEY
    });
    
    const youTubeResource = await youtube.videos.list({
        id: video.ytUrl.split("/").at(-1), // YouTube Resource Id
        part: ['snippet', 'contentDetails'], // Basic Resource Info
    });

    const thumbnailUrl = youTubeResource.data.items[0].snippet.thumbnails.medium.url;
    const duration = td.parse(youTubeResource.data.items[0].contentDetails.duration);

    return(
        <li id="video-card">
            <img id="thumbnail" src={thumbnailUrl} />
            <Link href={`/video/${num}`}>{num +". "+title}</Link>
            <p>{difficulty} — {duration.minutes+":"+duration.seconds}</p>
        </li>
    )
}