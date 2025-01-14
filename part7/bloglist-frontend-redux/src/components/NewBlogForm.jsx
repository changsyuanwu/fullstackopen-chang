import { useDispatch } from "react-redux";
import {
  TextField,
  Button
} from "@mui/material";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";

const NewBlogForm = ({ toggleFormVisibility }) => {
  const dispatch = useDispatch();

  const addBlog = async (event) => {
    event.preventDefault();
    const { title, author, url } = event.target.elements;
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
    };
    dispatch(createBlog(blogObject));
    title.value = "";
    author.value = "";
    url.value = "";
    dispatch(setNotification({
      status: "success",
      message: `A new blog ${blogObject.title} by ${blogObject.author} added`,
    }));
    toggleFormVisibility();
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        <TextField
          required
          name="title"
          placeholder="An exciting title..."
          label="Title"
          data-testid="title"
        />
      </div>
      <div>
        <TextField
          name="author"
          placeholder="The amazing author..."
          label="Author"
          data-testid="author"
        />
      </div>
      <div>
        <TextField
          required
          name="url"
          label="Blog URL"
          placeholder="https://www.example.com"
          data-testid="url"
        />
      </div>
      <Button variant="outlined" type="submit">create</Button>
    </form>
  );
};

export default NewBlogForm;
