/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Menu = ({ token }) => {
  const padding = {
    padding: 5,
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
        <Link style={padding} to="/add">
          add book
        </Link>
      ) : (
        <Link style={padding} to="/login">
          login
        </Link>
      )}
    </div>
  );
}

export default Menu;