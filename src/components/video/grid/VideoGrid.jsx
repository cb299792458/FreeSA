import './VideoGrid.scss';
import VideoCard from '../card/VideoCard';
import { durationMap } from '../filter/VideoFilter';
import axios from 'axios';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VideoGrid({filter, limit, progress}){
    const [fetchedVideos, setFetchedVideos] = useState([]);
    const [videos, setVideos] = useState([]);
    const {difficulty, duration, tag} = filter;

    limit ||= Infinity;
  
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/api/videos/index`)
            setFetchedVideos(response.data);
        }
        fetchData();
    }, [])

    useEffect(() => {
        const allVideos = Object.values(fetchedVideos);
        setVideos(allVideos
            .filter(v => !difficulty.length || difficulty.includes(v.difficulty))
            .filter(v => !tag || v.tag === tag)
            .filter((v) => {
                return !duration.length || duration.some(key => {
                    return durationMap[key](v)
                })
            })
        );

    }, [filter, fetchedVideos, difficulty, duration, tag])

    return(
        <ol className="video-grid">
            {videos.slice(0, limit).map((video) => {
                return (<VideoCard key={video._id} video={video} completed={!!progress[video.num]}/>)
            })}
        </ol>
    )
}
