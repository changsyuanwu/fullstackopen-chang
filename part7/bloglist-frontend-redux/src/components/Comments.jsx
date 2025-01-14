import { useDispatch } from "react-redux";
import { addCommentOnBlog } from "../reducers/blogReducer";

const Comments = ({ blog }) => {
  const dispatch = useDispatch();
  const comments = blog.comments;

  const handleAddComment = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    event.target.comment.value = "";
    dispatch(addCommentOnBlog(blog.id, comment));
  };

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={handleAddComment}>
        <input name="comment" />
        <button type="submit">add comment</button>
      </form>
      {!comments || comments.length === 0 ? (
        <p>no comments yet...</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comments;