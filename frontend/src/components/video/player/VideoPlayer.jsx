import "./VideoPlayer.scss"


export default function Video({ video }){

    const {title, difficulty, ytId } = video;

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
                <h3>{title}</h3>
                <p>{difficulty}</p>
            </div>
        </div>
    )
}