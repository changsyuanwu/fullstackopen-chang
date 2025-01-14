import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/currentUserReducer";
import { setNotification } from "../reducers/notificationReducer";

const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUser);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(
      setNotification({
        status: "success",
        message: "Logged out",
      }),
    );
  };

  const padding = {
    paddingRight: 5,
  };

  return (
    <div>
      <Link to="/" style={padding}>
        blogs
      </Link>
      <Link to="/users" style={padding}>
        users
      </Link>
      <span>
        logged in as {user.name}
        <button onClick={handleLogout}>logout</button>
      </span>
    </div>
  );
}

export default Menu