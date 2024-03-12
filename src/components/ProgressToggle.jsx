'use client';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function ProgressToggle ({videoId}) {
    const [progress, setProgress] = useState({});
    const [loggedIn, setLoggedIn] = useState(true);

    useEffect(() => {
        const getProgress = async () => {
            const res = await axios.get('/api/progress/');
            const data = res.data;
            setProgress(data.progress || {});
        }
        getProgress();
    }, []);

    const toggleSolved = async () => {
        const res = await axios.patch(`/api/progress/`, {progress: {
            ...progress, [videoId]: !progress[videoId]
        }});
        setProgress((prevProgress) => {
            return {...prevProgress, [videoId]: !prevProgress[videoId]};
        });

        if (res?.data?.msg === 'not logged in') setLoggedIn(false);
    };

    return (
        <div>
            <a onClick={toggleSolved} style={{textDecoration: 'underline', cursor: 'pointer'}}>{!!progress[videoId] ? 'You Did It!' : 'Mark as Solved?'}</a>
            <br/>
            {loggedIn ? '' : 'Sign In to Save Your Progress'}
        </div>
    )
}
