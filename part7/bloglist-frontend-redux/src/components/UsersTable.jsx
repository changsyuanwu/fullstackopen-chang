import { useSelector } from "react-redux";

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
            <td>{user.username}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;