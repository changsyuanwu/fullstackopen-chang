import { useSelector } from "react-redux";
import { useRef } from "react";
import NewBlogForm from "./NewBlogForm";
import Togglable from "./Togglable";
import BlogList from "./BlogList";

const BlogsPage = () => {
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();

  const toggleFormVisibility = () => {
    blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <Togglable buttonLabel="New blog" refs={blogFormRef}>
        <NewBlogForm toggleFormVisibility={toggleFormVisibility} />
      </Togglable>
      <BlogList curUser={user} />
    </div>
  );
}

export default BlogsPage;