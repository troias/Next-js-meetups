import classes from './comment-list.module.css';

function CommentList(props) {
  const { comments } = props.comments;
  console.log("CommentListProps", comments)
  return (
    <>
      {comments && comments.map(comment =>
        <ul className={classes.comments} key={comment.id}>

          <li >
            <p>{comment.text}</p>
            <div>
              By <address>{comment.name}</address>
            </div>
          </li>

        </ul>
      )}
    </>
  );
}

// export const getStaticPaths = async () => {
//   return {
//     paths: [],
//   }
// }

// export const getStaticProps = async (ctx) => {
//   const commentId = ctx.params.comment
//   const req = await fetch(`/api/comments/${commentId}`)
//   const res = await req.json()

//   return {
//     props: {
//       comments: res
//     }
//   }

// }
export default CommentList;