import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Patient } from "../../types";

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
        <div key={entry.id}>
          <Typography component="div">
            {entry.date}{" "}
            <Box component="span" sx={{ fontStyle: "italic" }}>{entry.description}</Box>
          </Typography>
          <List>
            {entry.diagnosisCodes?.map((code) => (
              <ListItem sx={{ listStyleType: "disc", pl: 4 }} key={code}>
                <ListItemText primary={code} sx={{ display: "list-item" }} />
              </ListItem>
            ))}
          </List>
        </div>
      ))}
    </div>
  );
};

export default PatientEntries;