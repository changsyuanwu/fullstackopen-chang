import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Button,
  Typography
} from "@mui/material";
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

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <Typography>
          <em>logged in as {user.name}</em>
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Menu