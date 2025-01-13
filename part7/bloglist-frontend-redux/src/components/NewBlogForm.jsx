import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const NewBlogForm = ({ createBlog }) => {
  const dispatch = useDispatch();

  const addBlog = async (event) => {
    event.preventDefault();
    const { title, author, url } = event.target.elements;
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
    };
    await createBlog(blogObject);
    title.value = "";
    author.value = "";
    url.value = "";
    dispatch(setNotification({
      status: "success",
      message: `A new blog ${blogObject.title} by ${blogObject.author} added`,
    }));
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          name="title"
          placeholder="An exciting title..."
          data-testid="title"
        />
      </div>
      <div>
        author:
        <input
          name="author"
          placeholder="The amazing author..."
          data-testid="author"
        />
      </div>
      <div>
        url:
        <input
          name="url"
          placeholder="https://www.example.com"
          data-testid="url"
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default NewBlogForm;
