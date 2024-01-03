"use client"
import "./home.scss";
import { useEffect, useState } from 'react';
import VideoGrid from '../../components/video/grid/VideoGrid';


export default function Home(){
  const [difficulty, setDifficulty] = useState([]);
  const [duration, setDuration] = useState([]);
  const filter = {
    difficulty,
    duration
  }

  useEffect(() => {
    console.log(filter);
  })

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
    <main>
      <section id="home-left">
        <h3>Filter</h3>
        <label htmlFor="difficulty-filter">Difficulty</label>
        <div id="difficulty-filter" className="filter difficulty-filter">
          <label>Easy
            <input id="easy-select" type="checkbox"  onChange={() => filterDifficulty('easy')} checked/>
          </label>
          <label>Medium
            <input id="medium-select" type="checkbox"  onChange={() => filterDifficulty('medium')} checked/>
          </label>
          <label>Hard
            <input id="hard-select" type="checkbox"  onChange={() => filterDifficulty('hard')} checked/>
          </label>
        </div>

        <label htmlFor="duration-filter">Duration</label>
        <div id="duration-filter" className="filter duration-filter">
          <label>5:59 or less
            <input id="easy-select" type="checkbox"  onChange={() => filterDuration(0)} checked/>
          </label>6:00 - 8:59
          <label>
            <input id="medium-select" type="checkbox"  onChange={() => filterDuration(1)} checked/>
          </label>
          <label>9:00 - 11:59
            <input id="hard-select" type="checkbox"  onChange={() => filterDuration(2)} checked/>
          </label>
          <label> 12:00+
            <input id="hard-select" type="checkbox"  onChange={() => filterDuration(3)} checked/>
          </label>
        </div>
      </section>
      <section id="home-right">
        <VideoGrid filter={filter}/>
      </section>
    </main>
  )
}
