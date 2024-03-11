'use client'
import { useEffect, useState } from "react";
import "./Comments.scss"
import axios from "axios";

export default function Comments({ video }){
    const {title, difficulty, ytUrl, num} = video;
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const getProgress = async () => {
            const res = await axios.get(`/api/comments/read/${num}`);
            setComments(res.data.comments || []);
        }
        getProgress();
    }, []);


    return(
    <div id="comments-container">
        <ul>
            {comments.map((comment) => {
                return(
                    <li key={comment._id}>
                        <h3>{comment.displayName}</h3>
                        <h5>{comment.createdAt}</h5>
                        <p>{comment.text}</p>
                        {comment.updatedAt && <h5>(Edited at comment.updatedAt)</h5>}
                    </li>
                )
            })}
        </ul>
    </div>
    )
}
