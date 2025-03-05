import diaries from "../../data/diaryEntries";

import { DiaryEntry } from "../types";

const getEntries = (): DiaryEntry[] => {
  return diaries;
};
const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary,
};
