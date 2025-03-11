import diaries from "../../data/diaryEntries";
import {
  NonSensitiveDiaryEntry,
  DiaryEntry,
  NewDiaryEntry,
} from "../types";

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const findEntryById = (id: number): DiaryEntry | undefined => {
  return diaries.find((d) => d.id === id);
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...entry,
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findEntryById,
};
