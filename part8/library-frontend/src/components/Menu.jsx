/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useApolloClient } from "@apollo/client";

const Menu = ({ token, setToken }) => {
  const client = useApolloClient();

  const padding = {
    padding: 5,
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <Link style={padding} to="/authors">
        authors
      </Link>
      <Link style={padding} to="/books">
        books
      </Link>
      {token ? (
        <>
          <Link style={padding} to="/add">
            add book
          </Link>
          <Link style={padding} to="/recommendations">
            recommendations
          </Link>
          <button onClick={logout}>logout</button>
        </>
      ) : (
        <Link style={padding} to="/login">
          login
        </Link>
      )}
    </div>
  );
}

export default Menu;