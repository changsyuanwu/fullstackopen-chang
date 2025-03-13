import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Diagnosis, Patient } from "../../types";
import diagnosesService from "../../services/diagnoses";
import EntryDetails from "./EntryDetails";

interface Props {
  patient: Patient
}

const PatientEntries = ({ patient }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnosesList();
  }, []);

  return (
    <div>
      <Typography
        variant="h5"
        style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
      >
        entries
      </Typography>
      {patient.entries.map((entry) => (
        <EntryDetails entry={entry} diagnoses={diagnoses} key={entry.id} />
      ))}
    </div>
  );
};

export default PatientEntries;