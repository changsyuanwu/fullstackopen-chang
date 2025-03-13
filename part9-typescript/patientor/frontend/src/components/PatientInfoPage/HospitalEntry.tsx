import { Box, Typography } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import type { HospitalEntry } from "../../types";
import DiagnosesList from "./DiagnosesList";

interface Props {
  entry: HospitalEntry,
}

const HospitalEntry = ({ entry }: Props) => {
  return (
    <Box component="fieldset">
      <Typography>
        {entry.date} <LocalHospitalIcon fontSize="large" />
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>
      <DiagnosesList diagnosisCodes={entry.diagnosisCodes} />
      {entry.discharge && (
        <Typography>
          Patient was discharged on {entry.discharge.date} under criteria:{" "}
          <Box component="span" sx={{ fontStyle: "italic" }}>
            {entry.discharge.criteria}
          </Box>
        </Typography>
      )}
      <Typography>diagnosed by {entry.specialist}</Typography>
    </Box>
  );
};

export default HospitalEntry;