import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeUsers } from "../reducers/userReducer";

const UsersPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
  })
  
  return (
    <div>
      <h2>Users</h2>
    </div>
  );
};

export default UsersPage;
