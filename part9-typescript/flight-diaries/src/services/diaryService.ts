import diaries from "../../data/diaryEntries";
import { NonSensitiveDiaryEntry, DiaryEntry } from "../types";

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

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findEntryById,
};
