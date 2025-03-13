import { Box, Typography } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import type { OccupationalHealthcareEntry } from "../../types";
import DiagnosesList from "./DiagnosesList";

interface Props {
  entry: OccupationalHealthcareEntry
}

const OccupationalHealthcareEntry = ({ entry }: Props) => {
  return (
    <Box component="fieldset">
      <Typography>
        {entry.date} <MedicalServicesIcon fontSize="large" />{" "}
        {entry.employerName}
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>
      <DiagnosesList diagnosisCodes={entry.diagnosisCodes} />
      {entry.sickLeave && (
        <Typography>
          Patient took sick leave starting on on {entry.sickLeave.startDate} and
          ending on {entry.sickLeave.endDate}
        </Typography>
      )}
      <Typography>diagnosed by {entry.specialist}</Typography>
    </Box>
  );
};

export default OccupationalHealthcareEntry;
