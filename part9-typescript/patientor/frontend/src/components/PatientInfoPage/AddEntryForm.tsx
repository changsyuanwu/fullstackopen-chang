import { SyntheticEvent, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
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
  Diagnosis,
} from "../../types";
import EntryFormTypeSpecificFields from "./EntryFormTypeSpecificFields";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";

interface Props {
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  setIsNewEntryFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddEntryForm = ({
  patient,
  setPatient,
  setIsNewEntryFormOpen,
}: Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<string>>([]);
  const [type, setType] = useState<Entry["type"]>("HealthCheck");
  const [healthCheckRating, setHealthCheckRating] = useState<string>("Healthy");
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<
    string | undefined
  >(undefined);
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string | undefined>(
    undefined
  );
  const [hospitalDischargeDate, setHospitalDischargeDate] = useState<
    string | undefined
  >(undefined);
  const [hospitalDischargeCriteria, setHospitalDischargeCriteria] =
    useState<string>("");
  const [error, setError] = useState<
    { title: string; message: string } | undefined
  >(undefined);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnosesList();
  }, []);

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
        newHealthCheckEntry.healthCheckRating =
          HealthCheckRating[
            healthCheckRating as keyof typeof HealthCheckRating
          ];
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
    try {
      const entry = await patientService.addEntryToPatient(
        patient.id,
        processTypeSpecificFields(newBaseEntry)
      );
      setPatient({
        ...patient,
        entries: patient.entries.concat(entry),
      });
      setIsNewEntryFormOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const firstError = error.response?.data.error[0];
        setError({
          title: `Error: Bad input: ${capitalizeFirstLetter(
            firstError.path[0]
          )}`,
          message: firstError.message,
        });
      }
    }
  };

  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleDiagnosisCodeChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const textFieldStyle = {
    my: "0.4em",
  };

  const datePickerStyle = {
    ...textFieldStyle,
    width: "15em",
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

  return (
    <>
      {error && (
        <Alert severity="error" onClose={() => setError(undefined)}>
          <AlertTitle>{error.title}</AlertTitle>
          {error.message}
        </Alert>
      )}
      <Box component="fieldset">
        <legend>
          <Typography variant="h6">Add an entry</Typography>
        </legend>
        <Box component="form">
          <FormControl fullWidth>
            <FormLabel id="entry-type-label">Entry type</FormLabel>
            <RadioGroup
              row
              value={type}
              name="type"
              aria-labelledby="entry-type-label"
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
          </FormControl>
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
                if (newValue) setDate(newValue);
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
          <FormControl fullWidth>
            <InputLabel id="diagnosis-codes-label" sx={textFieldStyle}>
              Diagnosis codes
            </InputLabel>
            <Select
              labelId="diagnosis-codes-label"
              id="diagnosis"
              multiple
              input={
                <OutlinedInput
                  id="select-multiple-diagnosis"
                  label="Diagnosis code"
                />
              }
              value={diagnosisCodes}
              onChange={handleDiagnosisCodeChange}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              sx={textFieldStyle}
              MenuProps={MenuProps}
            >
              {diagnoses.map((d) => (
                <MenuItem key={d.code} value={d.code}>
                  {d.code} {d.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
        </Box>
      </Box>
    </>
  );
};

export default AddEntryForm;