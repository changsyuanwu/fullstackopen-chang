import {
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  FormControl,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Entry } from "../../types";

interface Props {
  type: Entry["type"];
  setHealthCheckRating: React.Dispatch<React.SetStateAction<string>>;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  setSickLeaveStartDate: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  setSickLeaveEndDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  setHospitalDischargeDate: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  setHospitalDischargeCriteria: React.Dispatch<React.SetStateAction<string>>;
  textFieldStyle: object;
  datePickerStyle: object;
}

const EntryFormTypeSpecificFields = ({
  type,
  setHealthCheckRating,
  setEmployerName,
  setSickLeaveStartDate,
  setSickLeaveEndDate,
  setHospitalDischargeDate,
  setHospitalDischargeCriteria,
  textFieldStyle,
  datePickerStyle,
}: Props) => {
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${value}`);
  };

  switch (type) {
    case "HealthCheck":
      return (
        <FormControl fullWidth>
          <FormLabel sx={{ mt: "0.5em" }}>Health Check Rating</FormLabel>
          <RadioGroup
            row
            name="healthCheckRating"
            defaultValue="Healthy"
            onChange={({ target }) => setHealthCheckRating(target.value)}
          >
            <FormControlLabel
              value="Healthy"
              control={<Radio />}
              label="Healthy"
            />
            <FormControlLabel
              value="LowRisk"
              control={<Radio />}
              label="Low Risk"
            />
            <FormControlLabel
              value="HighRisk"
              control={<Radio />}
              label="High Risk"
            />
            <FormControlLabel
              value="CriticalRisk"
              control={<Radio />}
              label="Critical Risk"
            />
          </RadioGroup>
        </FormControl>
      );
    case "OccupationalHealthcare":
      return (
        <>
          <TextField
            required
            fullWidth
            variant="outlined"
            sx={textFieldStyle}
            label="Employer name"
            onChange={({ target }) => setEmployerName(target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Sick leave start date"
              format="YYYY-MM-DD"
              sx={datePickerStyle}
              onChange={(newValue) =>
                setSickLeaveStartDate(newValue?.format("YYYY-MM-DD"))
              }
            />
            <DatePicker
              label="Sick leave end date"
              format="YYYY-MM-DD"
              sx={datePickerStyle}
              onChange={(newValue) =>
                setSickLeaveEndDate(newValue?.format("YYYY-MM-DD"))
              }
            />
          </LocalizationProvider>
        </>
      );
    case "Hospital":
      return (
        <>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Hospital discharge date"
              format="YYYY-MM-DD"
              sx={datePickerStyle}
              onChange={(newValue) =>
                setHospitalDischargeDate(newValue?.format("YYYY-MM-DD"))
              }
            />
          </LocalizationProvider>
          <TextField
            fullWidth
            variant="outlined"
            sx={textFieldStyle}
            label="Hospital discharge criteria"
            onChange={({ target }) =>
              setHospitalDischargeCriteria(target.value)
            }
          />
        </>
      );
    default:
      return assertNever(type);
  }
};

export default EntryFormTypeSpecificFields;
