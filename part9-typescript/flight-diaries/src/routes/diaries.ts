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

router.post("/", (_req, res) => {
  res.send("Saving a diary!");
});

export default router;
