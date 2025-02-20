import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    return [...state.anecdotes
      .filter(anecdote => anecdote.content.includes(state.filter))]
      .sort((a, b) => b.votes - a.votes);
  })

  const vote = (id) => {
    dispatch(voteAnecdote(id));
    dispatch(setNotification(
      `you voted '${anecdotes.find(anecdote => anecdote.id === id).content}'`,
      3
    ));
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
};

export default AnecdoteList;