"use client"
import "./home.scss";
import { useEffect, useState } from 'react';
import VideoGrid from '../../components/video/grid/VideoGrid';
import VideoFilter from "@/components/video/filter/VideoFilter";
import axios from "axios";

export default function Home(){
    const [difficulty, setDifficulty] = useState([]);
    const [duration, setDuration] = useState([]);
    const [tag, setTag] = useState('all');
    const [tagNames, setTagNames] = useState([]);
    const filter = {
        difficulty,
        setDifficulty,
        duration,
        setDuration,
        tag,
        setTag,
        tagNames,
        setTagNames
    }

    const [progress, setProgress] = useState({});
    const [fetchedVideos, setFetchedVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        const fetchData = async () => {
            const response = await axios.get(`/api/videos/index`)
            setFetchedVideos(response.data.videos);
            setTagNames(response.data.tagNames);
            const res = await axios.get('/api/progress/')
            const data = res.data;
            setProgress(data.progress || {});
        }
        
        fetchData().then(() => setLoading(false));
    }, [])

    return (
        <main id="home">
            <section id="home-left">
                <VideoFilter filter={filter} />
            </section>
            <section id="home-right">
                <VideoGrid filter={filter} progress={progress} fetchedVideos={fetchedVideos} loading={loading}/>
            </section>
        </main>
    )
}
