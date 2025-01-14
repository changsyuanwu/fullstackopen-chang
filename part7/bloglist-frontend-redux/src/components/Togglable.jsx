import { useState, useImperativeHandle } from "react";
import {
  Button,
} from "@mui/material";

const Togglable = ({ refs, ...props }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  const margin = {
    marginTop: "1em",
    marginBottom: "1em",
  }

  return (
    <div style={margin}>
      <div style={hideWhenVisible}>
        <Button variant="outlined" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  );
};

export default Togglable;
