import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, useMatch } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Typography
} from "@mui/material";
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
    return <Typography>user does not exist!</Typography>;
  }

  const margin = {
    marginTop: "1em"
  }

  return (
    <div>
      <Typography variant="h3" component={"h1"}>
        {user.name}
      </Typography>
      <Typography variant="h6" component={"h2"} style={margin}>
        Added blogs
      </Typography>
      {user.blogs.length === 0 ? (
        <Typography>no blogs found...</Typography>
      ) : (
        <List>
          {user.blogs.map((blog) => (
            <ListItem key={blog.id}>
              <ListItemText>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

export default UserDetailsPage;