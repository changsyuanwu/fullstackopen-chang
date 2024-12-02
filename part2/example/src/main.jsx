import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from "axios";

axios
  .get("http://localhost:3001/notes")
  .then(res => {
    const notes = res.data
    
    createRoot(document.getElementById("root")).render(
      <StrictMode>
        <App notes={notes} />
      </StrictMode>
    );
})


