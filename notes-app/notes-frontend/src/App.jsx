import { useState, useEffect, useRef } from "react";
import "./App.css";
import Note from './components/Note'
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import noteService from "./services/notes";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const noteFormRef = useRef();

  useEffect(() => {
    noteService.getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      });
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
    noteService.create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
      })
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((n) => (n.id === id ? returnedNote : n)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important);

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        "loggedNoteappUser", JSON.stringify(user)
      );
      setUser(user)
      noteService.setToken(user.token);
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    setUser(null);
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm
            handleLogin={handleLogin}
          />
        </Togglable>
      ) : (
        <div>
          <span>
            {user.name} logged-in
            <button onClick={handleLogout}>logout</button>
          </span>
          <Togglable buttonLabel="new note" refs={noteFormRef}>
            <NoteForm
              createNote={addNote}
            />
          </Togglable>
        </div>
      )}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default App;
