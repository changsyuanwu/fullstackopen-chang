import { useState } from "react"
import { DiaryEntry } from "../types"
import { addDiary } from "../services/diaryService"

interface NewDiaryFormProps {
  diaryEntries: DiaryEntry[],
  setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>,
}

const NewDiaryForm = (props: NewDiaryFormProps) => {
  const [date, setDate] = useState("")
  const [visibility, setVisibility] = useState("")
  const [weather, setWeather] = useState("")
  const [comment, setComment] = useState("")

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newDiaryEntry = {
      date,
      visibility,
      weather,
      comment
    }
    addDiary(newDiaryEntry).then((diaryEntry) => {
      props.setDiaryEntries(props.diaryEntries.concat(diaryEntry))
    })
    setDate("")
    setVisibility("")
    setWeather("")
    setComment("")
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <p></p>
      <form onSubmit={addEntry}>
        <div>
          <label htmlFor="date">date</label>
          <input
            id="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="visibility">visibility</label>
          <input
            id="visibility"
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="weather">weather</label>
          <input
            id="weather"
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="comment">comment</label>
          <input
            id="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
}

export default NewDiaryForm