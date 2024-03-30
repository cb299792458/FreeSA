import { notFound } from 'next/navigation';
import Link from 'next/link';
import VideoPlayer from '@/components/video/player/VideoPlayer';
import Comments from '@/components/video/comments/Comments';
import axios from 'axios';
// import ProgressToggle from '@/components/ProgressToggle';

export default async function VideoShow({ params }){
    const { videoId } = params;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    var video;
    var relatedVideos;
        
    const fetchData = async () => {
        const response = await axios.get(`${baseUrl}/api/videos/${videoId}`);
        const response2 = await axios.get(`${baseUrl}/api/videos/index`);
        video = response.data;
        if(!video._id) throw "No Video";
        relatedVideos = response2.data.videos.sort((a, b) => a.num - b.num);
    };

    await fetchData().catch((err) => notFound());
    
    return(
        <main>
            <section id="video-left">
                <h1>{video.num}. {video.title}</h1><br/>
                <VideoPlayer video={video} />
                <Comments video={video} />
                {/* <ProgressToggle videoId={videoId}/> */}
            </section>

            <section id="video-right">
                <h5>Navigation</h5>
                <Link href="/">Home</Link><br/>
                <nav style={{display: "flex", flexDirection: "column"}}>
                    <Link href="./index">All Videos</Link>
                    {Object.entries(relatedVideos).map(([id, video]) => {
                        return <Link key={id} href={`./${video.num}`}>{video.num +". "+video.title}</Link>
                    })}
                </nav>
            </section>
        </main>
    )
}
