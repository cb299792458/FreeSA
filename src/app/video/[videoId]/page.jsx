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
                <Link href="/home">Home</Link><br/>
                {video.tag &&
                <>
                    <h5>Videos tagged '{video.tag}'</h5>
                    <nav style={{display: "flex", flexDirection: "column"}}>
                        {Object.entries(relatedVideos).filter(([id, vid]) => vid.tag === video.tag).map(([id, video]) => {
                            return <Link key={id} href={`./${video.num}`}>{video.num +". "+video.title}</Link>
                        })}
                    </nav>
                </>
                }
                <details open={!video.tag}>
                    <summary style={{cursor: "pointer"}}>
                        <h5 style={{display: "inline"}}>More Videos</h5>
                    </summary>
                    <nav style={{display: "flex", flexDirection: "column"}}>
                        {Object.entries(relatedVideos).map(([id, video]) => {
                            return <Link key={id} href={`./${video.num}`}>{video.num +". "+video.title}</Link>
                        })}
                    </nav>
                </details>
            </section>
            <section id="video-right">
                <h1>{video.title}</h1>
                <h5># {video.num}</h5>
                <VideoPlayer video={video} />
                <Comments video={video} />
                {/* <ProgressToggle videoId={videoId}/> */}
            </section>
        </main>
    )
}
