import { Typography } from "@mui/material";

interface Props {
  name: string
}

const DiagnosedBy = ({ name }: Props) => {
  return <Typography>Diagnosed by {name}</Typography>;
};

export default DiagnosedBy;