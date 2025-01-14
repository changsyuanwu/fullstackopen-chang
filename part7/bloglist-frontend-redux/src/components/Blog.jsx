import { Link } from "react-router-dom";
import {
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const Blog = ({ blog }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton component={Link} to={`/blogs/${blog.id}`}>
        <ListItemText>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default Blog;
