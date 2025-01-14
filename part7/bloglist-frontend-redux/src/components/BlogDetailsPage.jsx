import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useMatch } from "react-router-dom";
import {
  Typography
} from "@mui/material";
import { initializeBlogs } from "../reducers/blogReducer";
import BlogDetails from "./BlogDetails";
import Comments from "./Comments";

const BlogDetailsPage = () => {
  const dispatch = useDispatch();
  const match = useMatch("/blogs/:id");
  const currentUser = useSelector((state) => state.currentUser);
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === match.params.id)
  );

  useEffect(() => {
    if (currentUser) {
      dispatch(initializeBlogs());
    }
  }, [currentUser]);

  if (!blog) {
    return <Typography>blog does not exist!</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" component={"h1"}>{blog.title}</Typography>
      <Typography variant="subtitle1">{blog.author}</Typography>
      <BlogDetails blog={blog} />
      <Comments blog={blog} />
    </div>
  );
};

export default BlogDetailsPage;