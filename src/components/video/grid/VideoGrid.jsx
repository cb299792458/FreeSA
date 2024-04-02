import './VideoGrid.scss';
import VideoCard from '../card/VideoCard';
import { durationMap } from '../filter/VideoFilter';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react'; 

export default function VideoGrid({filter, limit, progress, fetchedVideos, loading}){
    gsap.registerPlugin(useGSAP);
    const [videos, setVideos] = useState([]);
    const {difficulty, duration, tag, sortVal, sortDir} = filter;
        
    limit ||= Infinity;
    
    useEffect(() => {
        const allVideos = Object.values(fetchedVideos);
        const result = allVideos
        .filter(v => !difficulty.length || difficulty.includes(v.difficulty))
        .filter(v => tag === 'all' || v.tag === tag)
        .filter((v) => {
            return !duration.length || duration.some(key => {
                return durationMap[key](v)
            })
        })
        
        result.sort((a, b) => {
            if(sortVal === "number"){
                return a.num - b.num
            } else if(sortVal === "difficulty"){
                const diffs = {easy: 0, medium: 1, hard: 2};
                return diffs[a.difficulty] - diffs[b.difficulty];
            } else if (sortVal === "duration"){
                return (a.duration.minutes*60 + a.duration.seconds) - b.duration.minutes*60 + b.duration.seconds
            }
        })

        setVideos(sortDir === "asc" ? result : result.reverse());
            
    }, [fetchedVideos, difficulty, duration, tag, sortVal, sortDir])
        
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
                delay: 0.2,
                overwrite: true,
            });
        }
    }, [videos, loading])

    return(<>
        {loading && <img src="https://media.tenor.com/G7LfW0O5qb8AAAAi/loading-gif.gif" style={{margin: "50px auto", width: "10vw"}}/>}
        {!loading && 
            <ol className="video-grid">
                {videos.slice(0, limit).map((video) => {
                    return (<VideoCard key={video._id} video={video} completed={!!progress[video.num]}/>)
                })}
            </ol>
        }
    </>)
}
