import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useMatch } from "react-router-dom";
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
    return <p>blog does not exist!</p>;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.author}</p>
      <BlogDetails blog={blog} />
      <Comments blog={blog} />
    </div>
  );
};

export default BlogDetailsPage;