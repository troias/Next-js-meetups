import { useState, useEffect, useContext } from 'react';
import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comment.module.css';
import NotificationContext from '../../contextStore/notification-context'

function Comments(props) {
  const notificationCtx = useContext(NotificationContext)
  const { eventId } = props
  console.log("CommentsID", eventId)
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false)

  useEffect(() => {
    if (showComments) {
      setLoadingComments(true)
      const getComments = async () => {
        const req = await fetch(`/api/comments/${eventId}`)
        const res = await req.json()
        console.log("getCommentsRes", res)
        setComments(res)
        setLoadingComments(false)
      }
      getComments()
    }

  }, [showComments])




  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const addCommentHandler = async (commentData) => {
    notificationCtx.showNotification({
      title: 'Adding Comment',
      status: "pending",
      message: "Sending comment",

    })

    try {
      const req = await fetch(`/api/comments/${eventId}`,
        { method: "POST", body: JSON.stringify(commentData) })

      if (!req.ok) {
        throw new Error("sending failed")
      }

      const res = await req.json()

      notificationCtx.showNotification({
        title: 'Added Comment successfully',
        status: "success",
        message: "Added Comment successfully",

      })

    } catch (error) {
      notificationCtx.showNotification({
        title: 'Addeding comment failed',
        status: "error",
        message: error.message || "Addeding comment failed",

      })
    }



    // send data to API
  }


  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !loadingComments && <CommentList comments={comments} />}
      {showComments && loadingComments && <p>Loading comments</p>}
    </section>
  );
}

export default Comments;