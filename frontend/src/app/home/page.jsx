import "./home.scss";
import VideoCard from '@/components/video/card/VideoCard';
import axios from 'axios';

async function getVideos() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const videos = await axios.get(`${baseUrl}/api/videos/index`)

    return videos.data
}

export default async function Home() {
    const videos = await getVideos();

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
