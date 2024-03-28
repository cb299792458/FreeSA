import './VideoGrid.scss';
import VideoCard from '../card/VideoCard';
import { durationMap } from '../filter/VideoFilter';
import axios from 'axios';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react'; 

export default function VideoGrid({filter, limit, progress}){
    gsap.registerPlugin(useGSAP);
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
        
    useGSAP(() => {

        if(videos.length){
            let tl = gsap.timeline({});
            tl.set(".video-grid-item", {
                y: 0,
                opacity: 0
            })
            .to(".video-grid-item", {
                y: 100,
                opacity: 1,
                duration: 0.1,
                stagger: 0.1,
                delay: 0.25
            });
        }
    }, [videos])

    return(
        <ol className="video-grid">
            {videos.slice(0, limit).map((video) => {
                return (<VideoCard key={video._id} video={video} completed={!!progress[video.num]}/>)
            })}
        </ol>
    )
}
