
const CommentList = ({ comments }) => {
  return (
    <div>
      <h3>Comments</h3>
      {!comments || comments.length === 0 ? (
        <p>no comments yet...</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentList;