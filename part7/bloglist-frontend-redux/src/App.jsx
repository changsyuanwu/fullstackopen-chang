import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeCurrentUser, logout } from "./reducers/currentUserReducer";
import {
  Routes,
  Route,
  Link,
  useMatch,
  useNavigate
} from "react-router-dom";
import UsersPage from "./components/UsersPage";
import LoginPage from "./components/LoginPage";
import Notification from "./components/Notification";
import BlogsPage from "./components/BlogsPage";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeCurrentUser());
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setNotification({
      status: "success",
      message: "Logged out",
    }));
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
          <Routes>
            <Route path="/" element={<BlogsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
