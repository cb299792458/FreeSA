import Image from 'next/image'
import Link from 'next/link'
import data from "@/app/mockData.js";
import "./home.scss";
import VideoCard from '@/components/video/card/VideoCard';


export default function Home(){
  const videos = data.videos;
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
