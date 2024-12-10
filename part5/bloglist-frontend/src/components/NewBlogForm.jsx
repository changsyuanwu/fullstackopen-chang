const NewBlogForm = ({ addBlog }) => {
  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input name="title" />
      </div>
      <div>
        author:
        <input name="author" />
      </div>
      <div>
        url:
        <input name="url" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default NewBlogForm;