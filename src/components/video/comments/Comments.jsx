'use client';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
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
                <CommentForm video={video} setComments={setComments}/>
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

function CommentForm ({video, setComments}) {
    const {num} = video;
    const {data: session} = useSession();
    
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!session) return setError('Please sign in to comment');
      if (!text) return setError('Please enter a comment');
      try {
        await axios.post(`/api/comments/create/`, {
            text,
            displayName: session.user.name,
            videoNum: num,
        });
        setText('');
        setError('');
        setComments((prev) => [...prev, {
          text,
          displayName: session.user.name,
          videoNum: num,
          createdAt: (new Date()),
        }]);
        setSuccess('Comment posted successfully!');
      } catch (err) {
        setError('Failed to post comment');
      }
    }
    
    return <li>
        <form id="comment-form" onSubmit={handleSubmit}>
            <input id="comment-text" type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder={session ? `Post a comment as ${session.user.name}.` : 'Log in to comment.'}></input>
            <button type="submit">Post Comment</button>
        </form>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
    </li>
}

