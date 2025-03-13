import { Box, Typography } from "@mui/material";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { HealthCheckRating, type HealthCheckEntry } from "../../types";
import DiagnosesList from "./DiagnosesList";

interface Props {
  entry: HealthCheckEntry;
}

const HealthCheckEntry = ({ entry }: Props) => {
  return (
    <Box component="fieldset">
      <Typography>
        {entry.date} <MonitorHeartIcon fontSize="large" />
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>
      <DiagnosesList diagnosisCodes={entry.diagnosisCodes} />
      <Typography>
        Health check result:{" "}
        <Box component="span" sx={{ fontStyle: "italic" }}>
          {HealthCheckRating[entry.healthCheckRating]}
        </Box>
      </Typography>
      <Typography>diagnosed by {entry.specialist}</Typography>
    </Box>
  );
};

export default HealthCheckEntry;
