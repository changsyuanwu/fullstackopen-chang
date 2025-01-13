import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
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
      <h2>Users</h2>
      {
        users.length === 0 ?
          <p>no users found...</p> :
          <UsersTable />
      }
    </div>
  );
};

export default UsersPage;
