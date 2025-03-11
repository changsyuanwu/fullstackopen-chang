import { useState } from "react"
import { DiaryEntry } from "../types"
import { addDiary } from "../services/diaryService"
import axios from "axios"

interface NewDiaryFormProps {
  diaryEntries: DiaryEntry[],
  setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>,
}

const NewDiaryForm = (props: NewDiaryFormProps) => {
  const [date, setDate] = useState("")
  const [visibility, setVisibility] = useState("")
  const [weather, setWeather] = useState("")
  const [comment, setComment] = useState("")
  const [error, setError] = useState("")

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newDiaryEntry = {
      date,
      visibility,
      weather,
      comment
    }
    addDiary(newDiaryEntry)
      .then((diaryEntry) => {
        props.setDiaryEntries(props.diaryEntries.concat(diaryEntry));
        setError("");
        setDate("");
        setVisibility("");
        setWeather("");
        setComment("");
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const firstError = error.response?.data.error[0]
          setError(`Error: Bad input: ${firstError.path[0]} - ${firstError.message}`)
          console.log(firstError);
        }
      })
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <p style={{ color: "red" }}>{error}</p>
      <form onSubmit={addEntry}>
        <fieldset>
          <legend>New entry details:</legend>
          <div>
            <label htmlFor="date">date: </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="visibility">visibility: </label>
            <input
              type="radio"
              id="great"
              value="great"
              name="visibility"
              onChange={(event) => setVisibility(event.target.value)}
            />
            <label htmlFor="great">great</label>
            <input
              type="radio"
              id="good"
              value="good"
              name="visibility"
              onChange={(event) => setVisibility(event.target.value)}
            />
            <label htmlFor="good">good</label>
            <input
              type="radio"
              id="ok"
              value="ok"
              name="visibility"
              onChange={(event) => setVisibility(event.target.value)}
            />
            <label htmlFor="ok">ok</label>
            <input
              type="radio"
              id="poor"
              value="poor"
              name="visibility"
              onChange={(event) => setVisibility(event.target.value)}
            />
            <label htmlFor="poor">poor</label>
          </div>
          <div>
            <label htmlFor="weather">weather: </label>
            <input
              type="radio"
              id="sunny"
              value="sunny"
              name="weather"
              onChange={(event) => setWeather(event.target.value)}
            />
            <label htmlFor="sunny">sunny</label>
            <input
              type="radio"
              id="rainy"
              value="rainy"
              name="weather"
              onChange={(event) => setWeather(event.target.value)}
            />
            <label htmlFor="rainy">rainy</label>
            <input
              type="radio"
              id="cloudy"
              value="cloudy"
              name="weather"
              onChange={(event) => setWeather(event.target.value)}
            />
            <label htmlFor="cloudy">cloudy</label>
            <input
              type="radio"
              id="stormy"
              value="stormy"
              name="weather"
              onChange={(event) => setWeather(event.target.value)}
            />
            <label htmlFor="stormy">stormy</label>
            <input
              type="radio"
              id="windy"
              value="windy"
              name="weather"
              onChange={(event) => setWeather(event.target.value)}
            />
            <label htmlFor="windy">windy</label>
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
        </fieldset>
      </form>
    </div>
  );
}

export default NewDiaryForm