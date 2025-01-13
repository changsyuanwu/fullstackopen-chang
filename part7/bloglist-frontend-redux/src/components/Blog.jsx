import { useState } from "react";
import BlogDetails from "./BlogDetails";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [detailsVisible, setDetailsVisible] = useState(false);

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
        <button onClick={() => setDetailsVisible(!detailsVisible)}>
          {detailsVisible ? "hide" : "view"}
        </button>
      </div>
      {detailsVisible ? (
        <BlogDetails blog={blog} />
      ) : null}
    </div>
  );
};

export default Blog;
