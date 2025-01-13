import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import LoginPage from "./components/LoginPage";
import Notification from "./components/Notification";
import NewBlogForm from "./components/NewBlogForm";
import "./App.css";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";
import { initializeUser, logout } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs());
    }
  }, [user]);

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setNotification({
      status: "success",
      message: "Logged out",
    }));
  };

  const toggleFormVisibility = () => {
    blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginPage />
      ) : (
        <div>
          <h1>Blogs</h1>
          <span>
            Logged in as {user.name}
            <button onClick={handleLogout}>logout</button>
          </span>
          <Togglable buttonLabel="New blog" refs={blogFormRef}>
            <NewBlogForm toggleFormVisibility={toggleFormVisibility}/>
          </Togglable>
          <BlogList
            curUser={user}
          />
        </div>
      )}
    </div>
  );
};

export default App;
