import express, {
  NextFunction,
  Response,
  Request,
} from "express";
import { z } from "zod";
import {
  Entry,
  NewEntry,
  newEntrySchema,
  NewPatient,
  newPatientSchema,
  NonSensitivePatient,
  Patient
} from "../types";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get("/:id", (req: Request, res: Response<Patient>) => {
  const id = req.params.id;
  const patient = patientService.getPatientById(id);
  if (patient) {
    res.send(patient);
  }
  else {
    res.sendStatus(404);
  }
});

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post(
  "/:id/entries",
  newEntryParser,
  (req: Request<{id: string}, unknown, NewEntry>, res: Response<Entry>) => {
    const id = req.params.id;
    const entry = patientService.addEntry(id, req.body);
    if (entry) {
      res.json(entry);
    }
    else {
      res.sendStatus(404);
    }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post("/", newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.use(errorMiddleware);

export default router;