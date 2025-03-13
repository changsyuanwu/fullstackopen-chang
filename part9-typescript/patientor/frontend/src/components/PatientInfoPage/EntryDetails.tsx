import { Diagnosis, Entry } from "../../types";
import HospitalEntry from "./HospitalEntry";

interface Props {
  entry: Entry,
  diagnoses: Diagnosis[],
}

const EntryDetails = ({ entry, diagnoses }: Props) => {
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${value}`);
  };

  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
    case "HealthCheck":
      return <></>;
    case "OccupationalHealthcare":
      return <></>;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;