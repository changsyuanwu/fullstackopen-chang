import { List, ListItem, ListItemText } from "@mui/material";
import { useState, useEffect } from "react";
import { Diagnosis } from "../../types";
import diagnosesService from "../../services/diagnoses";

interface Props {
  diagnosisCodes: string[] | undefined
}

const DiagnosesList = ({ diagnosisCodes }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnosesList();
  }, []);


  if (!diagnosisCodes || diagnosisCodes.length === 0) {
    return <></>;
  }
  
  return (
    <List>
      {diagnosisCodes.map((code) => (
        <ListItem sx={{ listStyleType: "disc", pl: 4 }} key={code}>
          <ListItemText
            sx={{ display: "list-item" }}
            primary={`${code} ${diagnoses.find((d) => d.code === code)?.name}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default DiagnosesList;