import "./home.scss";
import VideoCard from '@/components/video/card/VideoCard';
import axios from "axios";
import { notFound } from 'next/navigation';


export default async function Home(){
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    let videos = [];
    const fetchVideos = async () => {
        const response = await axios.get(`${baseUrl}/api/videos/index`);
        videos = response.data;
    };
    await fetchVideos().catch((err) => notFound());
    
    return(
        <main>
            <section id="home-left">
            Navigation
            </section>
            <section id="home-right">
            <ol>
                {Object.entries(videos).map(([num, video]) => (
                    <VideoCard key={video._id} video={video} />
                ))}
            </ol>
            </section>
        </main>
    )
}
