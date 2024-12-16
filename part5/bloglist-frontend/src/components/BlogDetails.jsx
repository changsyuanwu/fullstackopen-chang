const BlogDetails = ({ blog }) => {
  return (
    <div>
      <p>{blog.url}</p>
      <p>likes: {blog.likes}</p>
      <button>like</button>
    </div>
  );
};

export default BlogDetails;