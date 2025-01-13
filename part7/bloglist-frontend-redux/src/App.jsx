import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginPage from "./components/LoginPage";
import loginService from "./services/login";
import Notification from "./components/Notification";
import NewBlogForm from "./components/NewBlogForm";
import "./App.css";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => {
        setBlogs(blogs.sort((a, b) => b.likes - a.likes));
      });
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const showNotification = (notification) => {
    setNotificationMessage(notification);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 3000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        "loggedBloglistAppUser",
        JSON.stringify(user),
      );
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
      showNotification({
        status: "success",
        message: `Logged in as ${user.name}`,
      });
    } catch (exception) {
      showNotification({
        status: "error",
        message: "Invalid username or password",
      });
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBloglistAppUser");
    setUser(null);
    showNotification({
      status: "success",
      message: "Logged out",
    });
  };

  const addBlog = async (blogObject) => {
    const newBlog = await blogService.create(blogObject);
    blogFormRef.current.toggleVisibility();
    setBlogs(blogs.concat(newBlog));
    showNotification({
      status: "success",
      message: `A new blog ${newBlog.title} by ${newBlog.author} added`,
    });
  };

  const updateBlog = async (blogObject) => {
    const updatedBlog = await blogService.update(blogObject.id, blogObject);
    setBlogs(blogs.map((b) => (b.id === blogObject.id ? updatedBlog : b)));
  };

  const deleteBlog = async (blogId) => {
    await blogService.deleteBlog(blogId);
    setBlogs(blogs.filter((b) => b.id !== blogId));
  };

  return (
    <div>
      <Notification message={notificationMessage} />
      {user === null ? (
        <LoginPage
          username={username}
          password={password}
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        <div>
          <h1>Blogs</h1>
          <span>
            Logged in as {user.name}
            <button onClick={handleLogout}>logout</button>
          </span>
          <Togglable buttonLabel="New blog" refs={blogFormRef}>
            <NewBlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
              curUser={user}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
