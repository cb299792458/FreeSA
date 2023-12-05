import Image from 'next/image'
import Link from 'next/link'
import data from "@/app/mockData.js";
import "./home.scss";
import VideoCard from '@/components/video/card/VideoCard';
import axios from 'axios';
import { notFound } from 'next/navigation';


export default async function Home(){
  let videos;

  const fetchData = async () => {
      const response = await axios.get(`http://localhost:3000/api/video/index`);
      videos = response.data;
  }

  await fetchData().catch((err) => notFound());

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
