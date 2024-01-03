// import Image from 'next/image';
// import Link from 'next/link';
import './VideoGrid.scss';
import VideoCard from '../card/VideoCard';
import axios from 'axios';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VideoGrid({filter}){
    let fetchedVideos = [];
    const [videos, setVideos] = useState([]);
  
    const fetchData = () => {
        return axios.get(`http://localhost:3000/api/video/index`)
            .then((response) => {
                fetchedVideos = response.data;
                setVideos(prev => Object.entries(fetchedVideos));
            });
    }
    useEffect(() => {
        fetchData().catch((err) => notFound());
    }, [filter])
  
    return(
        <ol className="video-grid">
            {videos.map(([num, video]) => {
                console.log(video);
                return (<VideoCard key={video._id} video={video} />)
            })}
        </ol>
    )
}