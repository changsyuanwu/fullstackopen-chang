const BlogDetails = ({ blog, updateBlog, deleteBlog, curUser }) => {
  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    updateBlog(updatedBlog);
  };

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
      deleteBlog(blog.id);
  };

  return (
    <div>
      <p>{blog.url}</p>
      <p>likes: {blog.likes}</p>
      <button onClick={handleLike}>
        like
      </button>
      <p>added by {blog.user.name}</p>
      {curUser.id === blog.user.id ?
        <button onClick={handleRemove}>
          remove
        </button> : null}
    </div>
  );
};

export default BlogDetails;