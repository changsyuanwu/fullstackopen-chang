import { useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import patientService from "../../services/patients";
import { Gender, Patient } from "../../types";
import PatientEntries from "./PatientEntries";
import AddEntryForm from "./AddEntryForm";

const PatientInfoPage = () => {
  const match = useMatch("/patients/:id");
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [isNewEntryFormOpen, setIsNewEntryFormOpen] = useState<boolean>(false);

  useEffect(() => {
    if (match?.params.id) {
      patientService
        .getPatientById(match.params.id)
        .then((patientInfo) => setPatient(patientInfo));
    }
  }, [match]);

  if (!patient) {
    return <Typography>loading...</Typography>;
  }

  const renderGenderIcon = () => {
    switch (patient.gender) {
      case Gender.Male:
        return <MaleIcon fontSize="large" />;
      case Gender.Female:
        return <FemaleIcon fontSize="large" />;
      case Gender.Other:
        return <TransgenderIcon fontSize="large" />;
    }
  };

  return (
    <div className="App">
      <Typography
        variant="h4"
        style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
      >
        {patient.name} {renderGenderIcon()}
      </Typography>
      <Typography>date of birth: {patient.dateOfBirth}</Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
      {isNewEntryFormOpen ? (
        <AddEntryForm
          patient={patient}
          setPatient={setPatient}
          setIsNewEntryFormOpen={setIsNewEntryFormOpen}
        />
      ) : (
        <Button
          variant="outlined"
          sx={{ mt: "0.5em" }}
          onClick={() => setIsNewEntryFormOpen(!isNewEntryFormOpen)}
        >
          Add new entry
        </Button>
      )}
      <PatientEntries patient={patient} />
    </div>
  );
};

export default PatientInfoPage;