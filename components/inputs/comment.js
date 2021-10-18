import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comment.module.css';

function Comments(props) {
  const { eventId } = props;
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      const getComments = async () => {
        const req = await fetch(`/api/comments/${eventId}`)
        const res = await req.json()
        setComments(res)
      }
      getComments()
    }
  
  }, [showComments])




function toggleCommentsHandler() {
  setShowComments((prevStatus) => !prevStatus);
}

const addCommentHandler = async (commentData) => {

  const req = await fetch(`/api/comments/${eventId}`,
    { method: "POST", body: JSON.stringify(commentData) })
  const res = await req.json()


  // send data to API
}

return (
  <section className={classes.comments}>
    <button onClick={toggleCommentsHandler}>
      {showComments ? 'Hide' : 'Show'} Comments
    </button>
    {showComments && <NewComment onAddComment={addCommentHandler} />}
    {showComments && <CommentList comments={comments} />}
  </section>
);
}

export default Comments;