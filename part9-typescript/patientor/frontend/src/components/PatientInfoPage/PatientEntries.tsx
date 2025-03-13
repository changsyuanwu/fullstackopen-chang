import { Typography } from "@mui/material";
import { Patient } from "../../types";
import EntryDetails from "./EntryDetails";

interface Props {
  patient: Patient
}

const PatientEntries = ({ patient }: Props) => {
  return (
    <div>
      <Typography
        variant="h5"
        style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
      >
        entries
      </Typography>
      {patient.entries.map((entry) => (
        <EntryDetails entry={entry} key={entry.id} />
      ))}
    </div>
  );
};

export default PatientEntries;