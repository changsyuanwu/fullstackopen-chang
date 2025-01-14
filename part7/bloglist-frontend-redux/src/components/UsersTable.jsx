import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

const UsersTable = () => {
  const users = useSelector((state) => {
    return [...state.users].sort((a, b) => b.blogs.length - a.blogs.length)
  });

  const usersTableStyle = {
    width: "25%",
  }

  return (
    <TableContainer component={Paper}>
      <Table style={usersTableStyle}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell align="left">
                <Link to={`/users/${user.id}`}>
                  {user.username}
                </Link>
              </TableCell>
              <TableCell align="left">{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;