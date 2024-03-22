import './VideoFilter.scss';

export const durationMap = {
    0: (video) => video.duration.minutes <= 5,
    1: (video) => video.duration.minutes >= 6 && video.duration.minutes <= 8,
    2: (video) => video.duration.minutes >= 9 && video.duration.minutes <= 11,
    3: (video) => video.duration.minutes >= 12,
}

export default function VideoFilter({filter}){
    
    const {setDifficulty, setDuration, setTag} = filter;
    
    function handleTagChange(e) {
        setTag(e.target.value);
    };
    const TagRadioButton = ({tagName}) => {
        return <div id="tag-filter" className="filter tag-filter">
            <label>
                <input
                    type="radio"
                    name="tag"
                    value={tagName}
                    onChange={handleTagChange}
                    checked={filter.tag === tagName}
                />
                &nbsp;{tagName}
            </label>
        </div>
    };

    function filterDifficulty(target){
        if(filter.difficulty.includes(target)){
        setDifficulty(prev => prev.filter(ele => ele !== target))
        } else {
        setDifficulty(prev => prev.concat([target]));
        }
    };

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
    };

    const tagNames = ['string', 'array', 'linked list', 'binary tree', 'graph', 'stack', 
        'binary search', 'recursion', 'dynamic programming', 'heap', 'trie'];

    return(
        <div className="video-filter">
            <h3>Filter</h3>
            <details closed="true">
                <summary>
                    <label htmlFor="duration-filter">By Tag</label>
                </summary>
                {tagNames.map((tagName) => (
                    <TagRadioButton handleTagChange={handleTagChange} tagName={tagName} key={tagName}/>
                ))}
            </details>
            <details open>
                <summary><label htmlFor="difficulty-filter"> By Difficulty</label></summary>
                <div id="difficulty-filter" className="filter difficulty-filter">
                    <label>
                        <input id="easy-select" type="checkbox"  onChange={() => filterDifficulty('easy')} />
                        &nbsp;Easy
                    </label>
                    <label>
                        <input id="medium-select" type="checkbox"  onChange={() => filterDifficulty('medium')} />
                        &nbsp;Medium
                    </label>
                    <label>
                        <input id="hard-select" type="checkbox"  onChange={() => filterDifficulty('hard')} />
                        &nbsp;Hard
                    </label>
                </div>
            </details>

            <details>
                <summary>
                    <label htmlFor="duration-filter">By Duration</label>
                </summary>
                <div id="duration-filter" className="filter duration-filter">
                    <label>
                        <input type="checkbox"  onChange={() => filterDuration(0)} />
                        &nbsp;0:00 - 5:59
                    </label>
                    <label>
                        <input type="checkbox"  onChange={() => filterDuration(1)} />
                        &nbsp;6:00 - 8:59
                    </label>
                    <label>
                        <input type="checkbox"  onChange={() => filterDuration(2)} />
                        &nbsp;9:00 - 11:59
                    </label>
                    <label> 
                        <input type="checkbox"  onChange={() => filterDuration(3)} />
                        &nbsp;12:00+
                    </label>
                </div>
            </details>
        </div>
    )
}
