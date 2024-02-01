import "./VideoPlayer.scss"


export default function Video({ video }){

    const {title, difficulty, ytUrl } = video;
    const ytId = ytUrl?.split("/").at(-1);

    return(
        <div id="video-container">
            <iframe
                id="video"
                src={`https://www.youtube.com/embed/${ytId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
            >
            </iframe>

            <div id="video-details">
                <a href={video.lcUrl}>Try it on LeetCode</a>
                <p>{difficulty}</p>
            </div>
        </div>
    )
}