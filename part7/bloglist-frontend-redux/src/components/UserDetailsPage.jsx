import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useMatch } from "react-router-dom";
import { initializeUsers } from "../reducers/userReducer";

const UserDetailsPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    if (currentUser) {
      dispatch(initializeUsers());
    }
  }, [currentUser]);

  const match = useMatch("/users/:id");
  const user = match
    ? users.find((user) => user.id === match.params.id)
    : null;
  console.log(match.params, user);
  if (!user) {
    return <p>user does not exist!</p>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {user.blogs.length === 0 ? (
        <p>no blogs found...</p>
      ) : (
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserDetailsPage;