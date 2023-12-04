import data from '@/app/mockData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import VideoPlayer from '@/components/video/player/VideoPlayer';
export default function VideoShow({ params }){
    const videos = data.videos;
    const { videoId } = params;
    
    if(!videos?.[videoId]){
        notFound();
    }
    
    const video = videos[videoId];
    return(
        <main>
            <section id="video-left">
                <VideoPlayer video={video} />

                <div id="comments-container">
                    <ul>
                        <li>These will be comments.</li>
                        <li>These will be comments.</li>
                        <li>These will be comments.</li>
                        <li>These will be comments.</li>
                    </ul>
                </div>
            </section>
            <section id="video-right">

                <h5>Navigation</h5>
                <Link href="/">Home</Link><br/>
                <nav style={{display: "flex", flexDirection: "column"}}>
                    <Link href="./index">All Videos</Link>
                    {Object.entries(videos).map(([id, video]) => {
                        return <Link key={id} href={`./${id}`}>{id +". "+video.title}</Link>
                    })}
                    <Link href="./1000">This video doesn't exist.</Link>
                </nav>
                <ol>
                    <li>Suggested Videos</li>
                    <li>Suggested Videos</li>
                    <li>Suggested Videos</li>
                    <li>Suggested Videos</li>
                    <li>Suggested Videos</li>
                    <li>Suggested Videos</li>
                    <li>Suggested Videos</li>
                    <li>Suggested Videos</li>
                    <li>Suggested Videos</li>
                    <li>Suggested Videos</li>
                    <li>Suggested Videos</li>
                    <li>Suggested Videos</li>
                    <li>Suggested Videos</li>
                    <li>Suggested Videos</li>
                    <li>Suggested Videos</li>
                    <li>Suggested Videos</li>
                </ol>
            </section>

            
        </main>
    )
}