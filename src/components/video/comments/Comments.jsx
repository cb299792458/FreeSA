'use client';
import { useEffect, useState } from "react";
import "./Comments.scss";
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
    }, [num]);


    return(
        <div id="comments-container">
            <ul>
                {comments.map((comment) => <Comment key={comment._id} comment={comment}/>)}
            </ul>
        </div>
    )
};

const Comment = ({comment}) => {
    return <li>
        <h4>{comment.displayName}</h4>
        <p>{comment.text}</p>
        <h6>Posted at {(new Date(comment.createdAt)).toLocaleString()}{comment.updatedAt ? `, Edited at ${(new Date(comment.updatedAt)).toLocaleString()}` : ''}</h6>
    </li>
};
