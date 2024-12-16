import blogService from "../services/blogs";

const BlogDetails = ({ blog, updateBlog }) => {
  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    updateBlog(updatedBlog);
  };

  return (
    <div>
      <p>{blog.url}</p>
      <p>likes: {blog.likes}</p>
      <button onClick={handleLike}>
        like
      </button>
    </div>
  );
};

export default BlogDetails;
