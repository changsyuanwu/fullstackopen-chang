import { SyntheticEvent, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
  HealthCheckRating,
  Patient,
  Entry,
  NewEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  NewBaseEntry,
} from "../../types";
import EntryFormTypeSpecificFields from "./EntryFormTypeSpecificFields";
import patientService from "../../services/patients";


interface Props {
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  setIsNewEntryFormOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const AddEntryForm = ({ patient, setPatient, setIsNewEntryFormOpen }: Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<string>>([]);
  const [type, setType] = useState<Entry["type"]>("HealthCheck");
  const [healthCheckRating, setHealthCheckRating] = useState<string>("Healthy");
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string | undefined>(undefined);
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string | undefined>(undefined);
  const [hospitalDischargeDate, setHospitalDischargeDate] = useState<
    string | undefined
    >(undefined);
  const [hospitalDischargeCriteria, setHospitalDischargeCriteria] = useState<string>("");

  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${value}`);
  };

  const processTypeSpecificFields = (newBaseEntry: NewBaseEntry): NewEntry => {
    switch (type) {
      case "HealthCheck":
        const newHealthCheckEntry: NewEntry = {
          ...newBaseEntry,
          type,
        } as HealthCheckEntry;
        newHealthCheckEntry.healthCheckRating = HealthCheckRating[healthCheckRating as keyof typeof HealthCheckRating];
        return newHealthCheckEntry;
      case "Hospital":
        const newHospitalEntry: NewEntry = {
          ...newBaseEntry,
          type,
        };
        if (hospitalDischargeDate) {
          const discharge = {
            date: hospitalDischargeDate,
            criteria: hospitalDischargeCriteria,
          };
          newHospitalEntry.discharge = discharge;
        }
        return newHospitalEntry;
      case "OccupationalHealthcare":
        const newOccupationalHealthcareEntry: NewEntry = {
          ...newBaseEntry,
          type,
        } as OccupationalHealthcareEntry;
        newOccupationalHealthcareEntry.employerName = employerName;
        if (sickLeaveStartDate && sickLeaveEndDate) {
          newOccupationalHealthcareEntry.sickLeave = {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          };
        }
        return newOccupationalHealthcareEntry;
      default:
        return assertNever(type);
    }
  };

  const submitNewEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    const newBaseEntry = {
      description,
      date: date.format("YYYY-MM-DD"),
      specialist,
      diagnosisCodes: diagnosisCodes,
    };
    const entry = await patientService
      .addEntryToPatient(
        patient.id,
        processTypeSpecificFields(newBaseEntry),
      );
    setPatient({
      ...patient,
      entries: patient.entries.concat(entry)
    });
    setIsNewEntryFormOpen(false);
  };

  const textFieldStyle = {
    my: "0.4em",
  };

  const datePickerStyle = {
    ...textFieldStyle,
    width: "15em",
  };

  return (
    <Box component="fieldset">
      <legend>
        <Typography variant="h6">Add an entry</Typography>
      </legend>
      <Box component="form">
        <FormControl fullWidth>
          <FormLabel>Entry type</FormLabel>
          <RadioGroup
            row
            value={type}
            name="type"
            onChange={({ target }) => {
              const value = target.value as Entry["type"];
              setType(value);
            }}
          >
            <FormControlLabel
              value="HealthCheck"
              control={<Radio />}
              label="Health Check"
            />
            <FormControlLabel
              value="OccupationalHealthcare"
              control={<Radio />}
              label="Occupational Healthcare"
            />
            <FormControlLabel
              value="Hospital"
              control={<Radio />}
              label="Hospital"
            />
          </RadioGroup>
          <TextField
            required
            fullWidth
            variant="outlined"
            sx={textFieldStyle}
            label="Description"
            onChange={({ target }) => setDescription(target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              format="YYYY-MM-DD"
              value={date}
              sx={datePickerStyle}
              onChange={(newValue) => {
                if (newValue)
                  setDate(newValue);
              }}
              slotProps={{
                textField: {
                  required: true,
                },
              }}
            />
          </LocalizationProvider>
          <TextField
            required
            fullWidth
            variant="outlined"
            sx={textFieldStyle}
            label="Specialist"
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <TextField
            fullWidth
            variant="outlined"
            sx={textFieldStyle}
            label="Diagnosis codes"
            onChange={({ target }) =>
              setDiagnosisCodes(target.value.split(","))
            }
          />
          <EntryFormTypeSpecificFields
            type={type}
            setHealthCheckRating={setHealthCheckRating}
            setEmployerName={setEmployerName}
            setSickLeaveStartDate={setSickLeaveStartDate}
            setSickLeaveEndDate={setSickLeaveEndDate}
            setHospitalDischargeDate={setHospitalDischargeDate}
            setHospitalDischargeCriteria={setHospitalDischargeCriteria}
            textFieldStyle={textFieldStyle}
            datePickerStyle={datePickerStyle}
          />
          <Box sx={{ mt: "0.5em" }}>
            <Button
              variant="contained"
              sx={{ float: "left" }}
              color="secondary"
              onClick={() => setIsNewEntryFormOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ float: "right" }}
              type="submit"
              onClick={submitNewEntry}
            >
              Add
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
};

export default AddEntryForm;
