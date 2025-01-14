import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  Typography
} from "@mui/material";
import { initializeUsers } from "../reducers/userReducer";
import UsersTable from "./UsersTable";

const UsersPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser)
  const users = useSelector((state) => state.users);

  useEffect(() => {
    if (currentUser) {
      dispatch(initializeUsers());
    }
  }, [currentUser])

  return (
    <div>
      <Typography variant="h3" component={"h1"}>Users</Typography>
      {
        users.length === 0 ?
          <Typography>no users found...</Typography> :
          <UsersTable />
      }
    </div>
  );
};

export default UsersPage;
