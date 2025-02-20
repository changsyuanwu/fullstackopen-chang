import { Alert } from "@mui/material";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification === null) {
    return null;
  }

  return (
    <Alert severity={notification.status}>{notification.message}</Alert>
  );
};

export default Notification;
