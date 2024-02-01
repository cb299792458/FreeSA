import "./Comments.scss"


export default function Comments({ video }){

    const {title, difficulty, ytUrl, comments } = video;

    return(
    <div id="comments-container">
        <ul>
            <li>These will be comments.</li>
            <li>These will be comments.</li>
            <li>These will be comments.</li>
            <li>These will be comments.</li>
        </ul>
    </div>
    )
}