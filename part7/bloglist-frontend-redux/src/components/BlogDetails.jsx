import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Button,
} from "@mui/material";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";

const BlogDetails = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUser);

  const handleLike = async () => {
    dispatch(likeBlog(blog));
  };

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
      dispatch(deleteBlog(blog.id));
  };

  return (
    <div className="blog-details">
      <Typography variant="subtitle1">{blog.url}</Typography>
      <Typography variant="subtitle1">likes: {blog.likes}</Typography>
      <Button variant="outlined" onClick={handleLike}>like</Button>
      {blog.user ? <Typography variant="body1">added by {blog.user.name}</Typography> : null}
      {user.id === blog.user.id ? (
        <Button onClick={handleRemove}>remove</Button>
      ) : null}
    </div>
  );
};

export default BlogDetails;
