import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const showNotification = (notification, displayDurInSecs = 5) => {
    dispatch({
      type: "SET_NOTIFICATION",
      payload: notification,
    });
    setTimeout(() => {
      dispatch({
        type: "REMOVE_NOTIFICATION",
      });
    }, displayDurInSecs * 1000);
  };

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
      showNotification(`a new anecdote "${newAnecdote.content}" created!`);
    },
    onError: (error) => {
      showNotification("anecdote is too short, must have length 5 or more");
    }
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
