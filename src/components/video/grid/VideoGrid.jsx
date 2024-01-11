import './VideoGrid.scss';
import VideoCard from '../card/VideoCard';
import { durationMap } from '../filter/VideoFilter';
import axios from 'axios';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VideoGrid({filter}){
    const [fetchedVideos, setFetchedVideos] = useState([]);
    const [videos, setVideos] = useState([]);
    const {difficulty, duration} = filter;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${baseUrl}/api/videos/index`)
            setFetchedVideos(response.data);
        }
        fetchData();
    }, [])

    useEffect(() => {
        const v = Object.entries(fetchedVideos);
        if(difficulty.length === 0 && duration.length === 0){
            setVideos(v);
        } else {
            setVideos(v.filter(([id, video]) => {
                return (
                    
                    (difficulty.length === 0 ?
                    true :
                    difficulty.includes(video.difficulty))
                    &&
                    (duration.length === 0 ?
                    true :
                    duration.some(key => {
                        return durationMap[key](video)
                    }))
                )
            }))
        }
    }, [filter, fetchedVideos])
  
    return(
        <ol className="video-grid">
            {videos.map(([num, video]) => {
                return (<VideoCard key={video._id} video={video} />)
            })}
        </ol>
    )
}
