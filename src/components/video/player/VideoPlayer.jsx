import ProgressToggle from "@/components/ProgressToggle";
import "./VideoPlayer.scss"


export default function Video({ video, ytId }){
    if(video){
        var { num, difficulty, ytUrl } = video;
        ytId = ytUrl?.split("/").at(-1);
    }

    return(
        <div id="video-container">
            <iframe
                id="video"
                src={`https://www.youtube.com/embed/${ytId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
            />

            {video && <div id="video-details">
                <a href={video.lcUrl}>Try it on LeetCode?</a>
                <ProgressToggle videoId={num} />
                <p>Difficulty: {difficulty.toUpperCase()}</p>
            </div>}
        </div>
    )
}
