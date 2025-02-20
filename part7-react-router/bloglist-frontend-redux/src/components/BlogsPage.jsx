import { useRef } from "react";
import NewBlogForm from "./NewBlogForm";
import Togglable from "./Togglable";
import BlogList from "./BlogList";

const BlogsPage = () => {
  const blogFormRef = useRef();

  const toggleFormVisibility = () => {
    blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <Togglable buttonLabel="New blog" refs={blogFormRef}>
        <NewBlogForm toggleFormVisibility={toggleFormVisibility} />
      </Togglable>
      <BlogList />
    </div>
  );
}

export default BlogsPage;