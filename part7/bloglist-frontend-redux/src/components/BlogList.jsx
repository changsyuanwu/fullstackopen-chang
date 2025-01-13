import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogList = ({ updateBlog, deleteBlog, curUser }) => {
  const blogs = useSelector((state) => {
    return [...state.blogs]
      .sort((a, b) => b.likes - a.likes);
  });

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