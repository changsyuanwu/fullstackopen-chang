import { useDispatch } from "react-redux";
import {
  Button,
  List,
  ListItem,
  TextField,
  Typography
} from "@mui/material";
import { addCommentOnBlog } from "../reducers/blogReducer";

const Comments = ({ blog }) => {
  const dispatch = useDispatch();
  const comments = blog.comments;

  const handleAddComment = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    event.target.comment.value = "";
    dispatch(addCommentOnBlog(blog.id, comment));
  };

  const margin = {
    marginTop: "1.5em"
  }

  return (
    <div style={margin}>
      <Typography variant="h4" component={"h2"}>
        Comments
      </Typography>
      <form onSubmit={handleAddComment}>
        <div>
          <TextField label="Comment" name="comment" />
        </div>
        <Button variant="outlined" type="submit">
          add comment
        </Button>
      </form>
      {!comments || comments.length === 0 ? (
        <Typography>no comments yet...</Typography>
      ) : (
        <List sx={{ listStyleType: "disc", pl: 4 }}>
          {comments.map((comment) => (
            <ListItem key={comment.id} sx={{ display: "list-item" }}>
              <Typography>{comment.content}</Typography>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default Comments;