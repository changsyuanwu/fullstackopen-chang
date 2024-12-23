const NewBlogForm = ({ createBlog }) => {
  const addBlog = async (event) => {
    event.preventDefault();
    const {
      title,
      author,
      url,
    } = event.target.elements;
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
    };
    await createBlog(blogObject);
    title.value = "";
    author.value = "";
    url.value = "";
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input name="title" placeholder="An exciting title..."/>
      </div>
      <div>
        author:
        <input name="author" placeholder="The amazing author..."/>
      </div>
      <div>
        url:
        <input name="url" placeholder="https://www.example.com"/>
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default NewBlogForm;