/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../queries";

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0]);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
      setUsername("");
      setPassword("");
      navigate("/books");
    }
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
