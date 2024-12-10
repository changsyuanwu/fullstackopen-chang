import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginPage from './components/LoginPage'
import loginService from './services/login'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
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
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBloglistAppUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
      showNotification({
        status: "success",
        message: `Logged in as ${user.name}`,
      });
    }
    catch (exception) {
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
    })
  };

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    };

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      event.target.title.value = "";
      event.target.author.value = "";
      event.target.url.value = "";
      showNotification({
        status: "success",
        message: `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      })
    });
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
          <NewBlogForm addBlog={addBlog} />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App