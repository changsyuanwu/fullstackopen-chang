import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeBlogs } from "../reducers/blogReducer";
import Blog from "./Blog";

const BlogList = ({ updateBlog, deleteBlog, curUser }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => {
    return [...state.blogs].sort((a, b) => b.likes - a.likes);
  });

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs());
    }
  }, [user]);

  return (
    <>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          curUser={curUser}
        />
      ))}
    </>
  );
};

export default BlogList;