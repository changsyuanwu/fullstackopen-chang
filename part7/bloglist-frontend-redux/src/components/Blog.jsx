import { useState } from "react";
import { Link } from "react-router-dom";
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
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} by {blog.author}
        </Link>
      </div>
    </div>
  );
};

export default Blog;
