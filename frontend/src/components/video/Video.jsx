import "./Video.scss"


export default function Video({ video }){

    const {details, src } = video;

    return(
        <div id="video-container">
            <iframe
                id="video"
                src={src}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
            >
            </iframe>

            <div id="video-details">
                <h3>{details.title}</h3>
                <p>{details.description}</p>
            </div>
        </div>
    )
}