import data from './mockData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Video from '@/components/video/Video';
export default function VideoShow({ params }){
    const videos = data.videos;
    const { videoId } = params;
    
    if(!videos?.[videoId]){
        notFound();
    }
    
    const { resourceId, resourceType } = videos[videoId];
    const video = videos[videoId];
    return(
        <main style={{height: "100%", width:"100%", textAlign: "center", display:"flex"}}>
            <section id="video-left">
                <Video video={video} />

                <p>Host: {resourceType}</p>
                <p>Resource Id: {resourceId}</p>
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
                        return <Link key={id} href={`./${id}`}>Video {id}</Link>
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