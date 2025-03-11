import { useEffect, useState } from "react";
import { getAllDiaries } from "./services/diaryService";
import { DiaryEntry } from "./types";
import DiaryEntries from "./components/DiaryEntries";
import NewDiaryForm from "./components/NewDiaryForm";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then((initialDiaryEntries) =>
      setDiaryEntries(initialDiaryEntries)
    );
  }, []);

  return (
    <div>
      <h1>Flight Diaries</h1>
      <NewDiaryForm diaryEntries={diaryEntries} setDiaryEntries={setDiaryEntries} />
      <DiaryEntries diaryEntries={diaryEntries}/>
    </div>
  );
}

export default App;
