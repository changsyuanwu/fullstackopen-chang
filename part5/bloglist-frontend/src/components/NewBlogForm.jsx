const NewBlogForm = ({ createBlog }) => {
  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    };
    await createBlog(blogObject);
    event.target.title.value = "";
    event.target.author.value = "";
    event.target.url.value = "";
  }

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