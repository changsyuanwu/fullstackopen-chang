import { useEffect, useState } from "react";
import { Note } from "./types";
import { createNote, getAllNotes } from "./services/noteService";

const App = () => {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([
    { id: "1", content: "testing" }
  ]);

  useEffect(() => {
    getAllNotes().then((initialNotes) => setNotes(initialNotes));
  }, []);

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createNote({ content: newNote }).then((note) => {
      setNotes(notes.concat(note));
    });
    setNewNote("");
  };

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
