/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express, { Response } from "express";
import { NonSensitiveDiaryEntry } from "../types";
import diaryService from "../services/diaryService";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const entry = diaryService.findEntryById(id);
  if (entry) {
    res.send(entry);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  const { date, weather, visibility, comment } = req.body;
  const addedEntry = diaryService.addDiary({
    date,
    weather,
    visibility,
    comment,
  });
  res.json(addedEntry);
});

export default router;
