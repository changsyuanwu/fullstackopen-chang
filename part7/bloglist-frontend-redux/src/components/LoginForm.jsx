import { useDispatch } from "react-redux";
import {
  Button,
  TextField
} from "@mui/material";
import { login } from "../reducers/currentUserReducer";

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    const { username, password } = event.target.elements;
    dispatch(login(username.value, password.value));
    username.value = "";
    password.value = "";
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <TextField label="username" data-testid="username" type="text" name="Username" />
      </div>
      <div>
        <TextField label="password" data-testid="password" type="password" name="Password" />
      </div>
      <Button variant="contained" type="submit">
        login
      </Button>
    </form>
  );
};

export default LoginForm;
