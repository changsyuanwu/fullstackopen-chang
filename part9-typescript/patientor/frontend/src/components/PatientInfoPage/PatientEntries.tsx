import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Diagnosis, Patient } from "../../types";
import diagnosesService from "../../services/diagnoses";

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
        <div key={entry.id}>
          <Typography component="div">
            {entry.date}{" "}
            <Box component="span" sx={{ fontStyle: "italic" }}>
              {entry.description}
            </Box>
          </Typography>
          <List>
            {entry.diagnosisCodes?.map((code) => (
              <ListItem sx={{ listStyleType: "disc", pl: 4 }} key={code}>
                <ListItemText
                  sx={{ display: "list-item" }}
                  primary={`${code} ${diagnoses.find(d => d.code === code)?.name}`}
                />
              </ListItem>
            ))}
          </List>
        </div>
      ))}
    </div>
  );
};

export default PatientEntries;