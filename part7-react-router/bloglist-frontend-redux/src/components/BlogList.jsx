import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeBlogs } from "../reducers/blogReducer";
import Blog from "./Blog";
import { List } from "@mui/material";

const BlogList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUser);
  const blogs = useSelector((state) => {
    return [...state.blogs].sort((a, b) => b.likes - a.likes);
  });

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs());
    }
  }, [user]);

  return (
    <List>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </List>
  );
};

export default BlogList;