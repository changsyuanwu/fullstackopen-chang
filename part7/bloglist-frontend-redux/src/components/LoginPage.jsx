import LoginForm from "./LoginForm";
import {
  Typography
} from "@mui/material";

const LoginPage = () => {
  return (
    <div>
      <Typography variant="h2" component={"h1"}>Log in to Chang&apos;s bloglist app</Typography>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
