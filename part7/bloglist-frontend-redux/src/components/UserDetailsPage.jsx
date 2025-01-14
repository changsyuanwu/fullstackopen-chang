import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, useMatch } from "react-router-dom";
import { initializeUsers } from "../reducers/userReducer";

const UserDetailsPage = () => {
  const dispatch = useDispatch();
  const match = useMatch("/users/:id");
  const currentUser = useSelector((state) => state.currentUser);
  const user = useSelector((state) =>
    state.users.find((user) => user.id === match.params.id)
  );

  useEffect(() => {
    if (currentUser) {
      dispatch(initializeUsers());
    }
  }, [currentUser]);

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
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserDetailsPage;