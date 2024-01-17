"use client"
import axios from "axios";
import { useState } from "react";
import "./upload.scss";
import { unstable_noStore as noStore } from 'next/cache';

export default function Upload(){
    noStore();
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
    const [loading, setLoading] = useState(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setVideoData((prevData) => ({
            ...prevData,
            [name]: name === 'references'
                ? value.split(',').map(ref => ref.trim())
                : value,
        }));
    };
    const handleDifficultyChange = (e) => {
        setVideoData((prevData) => ({...prevData, difficulty: e.target.value}));
    };

    const addVideo = async () => {
        if (!videoData.title ||!videoData.num || !videoData.ytUrl) return;
        if (!['easy', 'medium', 'hard'].includes(videoData.difficulty)) return;
        setLoading(true);
        try {
            const res = await axios.post('/api/videos/', videoData);
            if (res?.data?.ok) {
                setVideoData(blank);
                setSuccess(true);
            } else {
                console.error('Failed to add video.');
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div id="upload">
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
        <input
          type="radio"
          name="difficulty"
          value="easy"
          checked={videoData.difficulty === 'easy'}
          onChange={handleDifficultyChange}
        />
        Easy
      </label>

      <label>
        <input
          type="radio"
          name="difficulty"
          value="medium"
          checked={videoData.difficulty === 'medium'}
          onChange={handleDifficultyChange}
        />
        Medium
      </label>

      <label>
        <input
          type="radio"
          name="difficulty"
          value="hard"
          checked={videoData.difficulty === 'hard'}
          onChange={handleDifficultyChange}
        />
        Hard
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
                    {loading ? 'Adding...' : 'Add Video'}
                </button>
            </form>
        </div>
    );
}
