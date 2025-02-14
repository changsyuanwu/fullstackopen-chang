import {
  Routes,
  Route,
} from "react-router-dom";
import {
  useState,
  useEffect
} from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Menu from "./components/Menu";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const userToken = window.localStorage.getItem("library-user-token");
    if (userToken) {
      setToken(userToken);
    }
  }, []);

  return (
    <div>
      <Menu token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<LoginForm setToken={setToken} />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/recommendations" element={<Recommendations />} />
      </Routes>
    </div>
  );
};

export default App;
