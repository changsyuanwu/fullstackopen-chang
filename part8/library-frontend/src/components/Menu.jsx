import { Link } from "react-router-dom";
const Menu = () => {
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
      <Link style={padding} to="/add">
        add
      </Link>
    </div>
  );
}

export default Menu;