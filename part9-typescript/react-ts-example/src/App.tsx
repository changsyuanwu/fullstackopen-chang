import { useState } from "react";
import { Note } from "./types";


const App = () => {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([
    { id: "1", content: "testing" }
  ]);

  return (
    <div>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
