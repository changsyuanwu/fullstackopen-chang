import {
  Routes,
  Route,
} from "react-router-dom";
import {
  useState,
  useEffect
} from "react";
import { useApolloClient } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Menu from "./components/Menu";
import LoginForm from "./components/LoginForm";

const App = () => {
  const client = useApolloClient();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const userToken = window.localStorage.getItem("library-user-token");
    if (userToken) {
      setToken(userToken);
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <Menu token={token} />
      {token ? <button onClick={logout}>logout</button> : null}
      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/" element={<LoginForm setToken={setToken} />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </div>
  );
};

export default App;
