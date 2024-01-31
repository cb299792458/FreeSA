"use client"
import "./home.scss";
import { useState } from 'react';
import VideoGrid from '../../components/video/grid/VideoGrid';
import VideoFilter from "@/components/video/filter/VideoFilter";


export default function Home(){
    const [difficulty, setDifficulty] = useState([]);
    const [duration, setDuration] = useState([]);
    const filter = {
      difficulty,
      setDifficulty,
      duration,
      setDuration
    }

    return(
        <main>
            <section id="home-left">
                <VideoFilter filter={filter} />
            </section>
            <section id="home-right">
                <VideoGrid filter={filter} />
            </section>
        </main>
    )
}
