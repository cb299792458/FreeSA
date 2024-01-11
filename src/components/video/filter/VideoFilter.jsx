import './VideoFilter.scss';
import { useEffect, useState } from 'react';

export const durationMap = {
    0: (video) => video.duration.minutes <= 5,
    1: (video) => video.duration.minutes >= 6 && video.duration.minutes <= 8,
    2: (video) => video.duration.minutes >= 9 && video.duration.minutes <= 11,
    3: (video) => video.duration.minutes >= 12,
}

export default function VideoFilter({filter}){

    const {setDifficulty, setDuration} = filter;

    
    function filterDifficulty(target){
        if(filter.difficulty.includes(target)){
        setDifficulty(prev => prev.filter(ele => ele !== target))
        } else {
        setDifficulty(prev => prev.concat([target]));
        }
    }

    function filterDuration(target){
        // 0 => 5 minutes or less
        // 1 => 5 - 8 minutes
        // 2 => 9 - 12 minutes
        // 3 => 12+ minutes
        if(filter.duration.includes(target)){
        setDuration(prev => prev.filter(ele => ele !== target))
        } else {
        setDuration(prev => prev.concat([target]));
        }
    }
    return(
        <div className="video-filter">
            <h3>Filter</h3>
            <label htmlFor="difficulty-filter">Difficulty</label>
            <div id="difficulty-filter" className="filter difficulty-filter">
                <label>Easy
                    <input id="easy-select" type="checkbox"  onChange={() => filterDifficulty('easy')} />
                </label>
                <label>Medium
                    <input id="medium-select" type="checkbox"  onChange={() => filterDifficulty('medium')} />
                </label>
                <label>Hard
                    <input id="hard-select" type="checkbox"  onChange={() => filterDifficulty('hard')} />
                </label>
            </div>

            <label htmlFor="duration-filter">Duration</label>
            <div id="duration-filter" className="filter duration-filter">
                <label>5:59 or less
                    <input id="easy-select" type="checkbox"  onChange={() => filterDuration(0)} />
                </label>6:00 - 8:59
                <label>
                    <input id="medium-select" type="checkbox"  onChange={() => filterDuration(1)} />
                </label>
                <label>9:00 - 11:59
                    <input id="hard-select" type="checkbox"  onChange={() => filterDuration(2)} />
                </label>
                <label> 12:00+
                    <input id="hard-select" type="checkbox"  onChange={() => filterDuration(3)} />
                </label>
            </div>
        </div>
    )
}