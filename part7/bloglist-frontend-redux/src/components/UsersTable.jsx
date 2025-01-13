import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UsersTable = () => {
  const users = useSelector((state) => {
    return [...state.users].sort((a, b) => b.blogs.length - a.blogs.length)
  });

  const usersTableStyle = {
    width: "25%",
    textAlign: "center",
  }

  return (
    <table style={usersTableStyle}>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Blogs created</th>
        </tr>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>
                {user.username}
              </Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;