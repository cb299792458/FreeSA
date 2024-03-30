import './VideoGrid.scss';
import VideoCard from '../card/VideoCard';
import { durationMap } from '../filter/VideoFilter';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react'; 

export default function VideoGrid({filter, limit, progress, fetchedVideos, loading}){
    gsap.registerPlugin(useGSAP);
    const [videos, setVideos] = useState([]);
    const {difficulty, duration, tag} = filter;
    
    
    limit ||= Infinity;
    
    useEffect(() => {
        const allVideos = Object.values(fetchedVideos);
        setVideos(allVideos
            .filter(v => !difficulty.length || difficulty.includes(v.difficulty))
            .filter(v => tag === 'all' || v.tag === tag)
            .filter((v) => {
                return !duration.length || duration.some(key => {
                    return durationMap[key](v)
                })
            })
            );        
            
    }, [fetchedVideos, difficulty, duration, tag])
        
    useGSAP(() => {
        if(videos.length){
            let tl = gsap.timeline({});
            tl.set(".video-grid-item", {
                y: 0,
                opacity: 0,
                overwrite: true
            })
            .to(".video-grid-item", {
                y: 100,
                opacity: 1,
                duration: 0.2,
                stagger: 0.1,
                delay: 0.2
            });
        }
    }, [videos, fetchedVideos])

    if(loading) return <img src="https://media.tenor.com/G7LfW0O5qb8AAAAi/loading-gif.gif" style={{margin: "50px auto", width: "10vw"}}/>;
    return(
        <ol className="video-grid">
            {videos.slice(0, limit).map((video) => {
                return (<VideoCard key={video._id} video={video} completed={!!progress[video.num]}/>)
            })}
        </ol>
    )
}
