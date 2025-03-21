import { DiaryEntry } from "../types"

interface DiaryEntriesProps {
  diaryEntries: DiaryEntry[]
}

const DiaryEntries = (props: DiaryEntriesProps) => {

  // Sort with most recent on top
  props.diaryEntries.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <div>
      <h2>Diary entries</h2>
      <ul>
        {props.diaryEntries.map(diaryEntry => (
          <li key={diaryEntry.id}>
            <h3>{diaryEntry.date}</h3>
            <p>weather: {diaryEntry.weather}</p>
            <p>visibility: {diaryEntry.visibility}</p>
            <p>comment: {diaryEntry.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DiaryEntries