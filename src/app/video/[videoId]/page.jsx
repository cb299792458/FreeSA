import { notFound } from 'next/navigation';
import Link from 'next/link';
import VideoPlayer from '@/components/video/player/VideoPlayer';
import axios from 'axios';
// import { useEffect } from 'react';

export default async function VideoShow({ params }){
    const { videoId } = params;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    var video;
    var relatedVideos;
        
    const fetchData = async () => {
        const response = await axios.get(`${baseUrl}/api/video/${videoId}`);
        const response2 = await axios.get(`${baseUrl}/api/video/index`);
        video = response.data;
        relatedVideos = response2.data.sort((a, b) => a.num - b.num);
    };

    await fetchData().catch((err) => notFound());
    
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
                    {Object.entries(relatedVideos).map(([id, video]) => {
                        return <Link key={id} href={`./${video.num}`}>{video.num +". "+video.title}</Link>
                    })}
                    <Link href="./1000">This video doesn&apos;t exist.</Link>
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