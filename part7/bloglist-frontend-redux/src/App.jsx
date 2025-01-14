import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeCurrentUser } from "./reducers/currentUserReducer";
import {
  Routes,
  Route
} from "react-router-dom";
import UsersPage from "./components/UsersPage";
import LoginPage from "./components/LoginPage";
import Notification from "./components/Notification";
import BlogsPage from "./components/BlogsPage";
import Menu from "./components/Menu";
import UserDetailsPage from "./components/UserDetailsPage";
import "./App.css";
import BlogDetailsPage from "./components/BlogDetailsPage";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUser);

  useEffect(() => {
    dispatch(initializeCurrentUser());
  }, []);

  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginPage />
      ) : (
        <div>
          <Menu />
          <h1>Blogs</h1>
          <Routes>
            <Route path="/" element={<BlogsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/users/:id" element={<UserDetailsPage />} />
            <Route path="blogs/:id" element={<BlogDetailsPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
