import { useEffect, useState } from 'react'
import { getAllDiaries } from './services/diaryService'
import { DiaryEntry } from './types'

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    getAllDiaries().then(initialDiaryEntries => setDiaryEntries(initialDiaryEntries))
  }, [])

  return (
    <div>
      <h1>Flight Diaries</h1>
      <div>
        <h2>Diary entries</h2>
        <ul>
          {diaryEntries.map(diaryEntry => (
            <li key={diaryEntry.id}>
              <h3>{diaryEntry.date}</h3>
              <p>weather: {diaryEntry.weather}</p>
              <p>visibility: {diaryEntry.visibility}</p>
              <p>comment: {diaryEntry.comment}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
