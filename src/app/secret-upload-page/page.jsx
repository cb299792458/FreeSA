"use client"
import axios from "axios";
import { useState } from "react";

export default function Upload(){
    const blank = {
        num: '',
        title: '',
        difficulty: '',
        lcUrl: '',
        ghUrl: '',
        ytUrl: '',
        references: [],
    };

    const [videoData, setVideoData] = useState(blank);
    const [success, setSuccess] = useState(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setVideoData((prevData) => ({
            ...prevData,
            [name]: name === 'references'
                ? value.split(',').map(ref => ref.trim())
                : value,
        }));
    };

    const addVideo = async () => {
        if (!videoData.title ||!videoData.num || !videoData.ytUrl) return;
        if (!['easy', 'medium', 'hard'].includes(videoData.difficulty)) return;
        try {
            const res = await axios.post('/api/videos/', videoData);
            if (res?.data?.ok) {
                setVideoData(blank);
                setSuccess(true);
            } else {
                console.error('Failed to add video.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>{success ? 'Video Added! Add another?' : 'Add Video'}</h1>
            <form>
                <label>
                    LeetCode Number:
                    <input type="text" name="num" value={videoData.num} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Title:
                    <input type="text" name="title" value={videoData.title} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Difficulty:
                    <input type="text" name="difficulty" value={videoData.difficulty} onChange={handleChange} />
                </label>
                <br />
                <label>
                    LC URL:
                    <input type="text" name="lcUrl" value={videoData.lcUrl} onChange={handleChange} />
                </label>
                <br />
                <label>
                    GitHub URL:
                    <input type="text" name="ghUrl" value={videoData.ghUrl} onChange={handleChange} />
                </label>
                <br />
                <label>
                    YouTube URL:
                    <input type="text" name="ytUrl" value={videoData.ytUrl} onChange={handleChange} />
                </label>
                <br />
                <label>
                    References (comma separated):
                    <textarea name="references" value={videoData.references} onChange={handleChange} />
                </label>
                <br />
                <button type="button" onClick={addVideo}>
                    Add Video
                </button>
            </form>
        </div>
    );
}