import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import type { Diagnosis, HospitalEntry } from "../../types";

interface Props {
  entry: HospitalEntry,
  diagnoses: Diagnosis[]
}

const HospitalEntry = ({ entry, diagnoses }: Props) => {
  return (
    <Box component="fieldset">
      <Typography>
        {entry.date} <LocalHospitalIcon fontSize="large" />
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>
      <List>
        {entry.diagnosisCodes?.map((code) => (
          <ListItem sx={{ listStyleType: "disc", pl: 4 }} key={code}>
            <ListItemText
              sx={{ display: "list-item" }}
              primary={`${code} ${
                diagnoses.find((d) => d.code === code)?.name
              }`}
            />
          </ListItem>
        ))}
      </List>
      {entry.discharge && (
        <Typography>
          Patient was discharged on {entry.discharge.date} under criteria:{" "}
          <Box component="span" sx={{ fontStyle: "italic" }}>
            {entry.discharge.criteria}
          </Box>
        </Typography>
      )}
    </Box>
  );
};

export default HospitalEntry;