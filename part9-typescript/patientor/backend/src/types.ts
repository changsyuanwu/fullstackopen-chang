import { z } from "zod";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface SickLeave {
  startDate: string,
  endDate: string,
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: string,
  sickLeave?: SickLeave,
}

interface Discharge {
  date: string,
  criteria: string,
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge?: Discharge
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export const newEntrySchema = z.object({
  description: z.string().nonempty(),
  date: z.string().date(),
  specialist: z.string().nonempty(),
  diagnosisCodes: z.array(z.string()).optional(),
  type: z.enum(["HealthCheck", "Hospital", "OccupationalHealthcare"]),
  healthCheckRating: z.number().min(0).max(3).optional(),
  employerName: z.string().nonempty().optional(),
  sickLeave: z
    .object({
      startDate: z.string().date(),
      endDate: z.string().date(),
    })
    .optional(),
  discharge: z
    .object({
      date: z.string().date(),
      criteria: z.string().date(),
    })
    .optional(),
});

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type NewEntry = UnionOmit<Entry, 'id'>;

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export type NewPatient = z.infer<typeof newPatientSchema>;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;