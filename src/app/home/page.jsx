"use client"
import "./home.scss";
import { useEffect, useState } from 'react';
import VideoGrid from '../../components/video/grid/VideoGrid';
import VideoFilter from "@/components/video/filter/VideoFilter";
import axios from "axios";

export default function Home(){
    const [difficulty, setDifficulty] = useState([]);
    const [duration, setDuration] = useState([]);
    const [tag, setTag] = useState('');
    const filter = {
        difficulty,
        setDifficulty,
        duration,
        setDuration,
        tag,
        setTag,
    }

    const [progress, setProgress] = useState({});
    useEffect(() => {
        const getProgress = async () => {
            const res = await axios.get('/api/progress/')
            const data = res.data;
            setProgress(data.progress || {});
        }
        getProgress();
    }, [])

    return (
        <main id="home">
            <section id="home-left">
                <VideoFilter filter={filter} />
            </section>
            <section id="home-right">
                <VideoGrid filter={filter} progress={progress}/>
            </section>
        </main>
    )
}
