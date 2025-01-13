import { useDispatch } from "react-redux";
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
        Username
        <input
          data-testid="username"
          type="text"
          name="username"
        />
      </div>
      <div>
        Password
        <input
          data-testid="password"
          type="password"
          name="password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
