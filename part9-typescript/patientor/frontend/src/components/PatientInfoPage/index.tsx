import { useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import patientService from "../../services/patients";
import { Gender, Patient } from "../../types";

const PatientInfoPage = () => {
  const match = useMatch("/patients/:id");
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

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
        return <MaleIcon />;
      case Gender.Female:
        return <FemaleIcon />;
      case Gender.Other:
        return <TransgenderIcon />;
    }
  };

  return (
    <div className="App">
      <Typography variant="h4" style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
        {patient.name} {renderGenderIcon()}
      </Typography>
      <Typography>date of birth: {patient.dateOfBirth}</Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
    </div>
  );
};

export default PatientInfoPage;