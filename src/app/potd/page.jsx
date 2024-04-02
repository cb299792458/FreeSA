import { notFound } from 'next/navigation';
import Link from 'next/link';
import VideoPlayer from '@/components/video/player/VideoPlayer';
import Comments from '@/components/video/comments/Comments';
import axios from 'axios';
// import ProgressToggle from '@/components/ProgressToggle';

export default async function VideoShow({ params }){
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    var ytId;
        
    const fetchData = async () => {
        const response = await axios.get(`${baseUrl}/api/videos/potd`);
        ytId = response.data;
    };

    await fetchData().catch((err) => notFound());
    
    return(
        <main>
            <section id="video-left">
                <VideoPlayer ytId={ytId} />
                {/* <ProgressToggle videoId={videoId}/> */}
            </section>
        </main>
    )
}
