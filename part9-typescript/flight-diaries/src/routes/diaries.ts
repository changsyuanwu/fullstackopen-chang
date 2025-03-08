import express, { Response } from "express";
import { z } from "zod";
import { NonSensitiveDiaryEntry } from "../types";
import diaryService from "../services/diaryService";
import { toNewDiaryEntry } from "../utils";

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
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);

    const addedEntry = diaryService.addDiary(newDiaryEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
  }
});

export default router;
