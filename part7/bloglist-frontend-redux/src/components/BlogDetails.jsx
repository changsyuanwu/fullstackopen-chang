import { useDispatch } from "react-redux";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";

const BlogDetails = ({ blog, deleteBlog, curUser }) => {
  const dispatch = useDispatch();

  const handleLike = async () => {
    dispatch(likeBlog(blog));
  };

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
      deleteBlog(blog.id);
  };

  return (
    <div className="blog-details">
      <p>{blog.url}</p>
      <p>likes: {blog.likes}</p>
      <button onClick={handleLike}>like</button>
      {blog.user ? <p>added by {blog.user.name}</p> : null}
      {curUser.id === blog.user.id ? (
        <button onClick={handleRemove}>remove</button>
      ) : null}
    </div>
  );
};

export default BlogDetails;
