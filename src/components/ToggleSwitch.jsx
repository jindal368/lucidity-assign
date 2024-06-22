import React from "react";
import { Switch, FormControlLabel } from "@mui/material";

const ToggleSwitch = ({ isAdmin, toggleAdmin }) => {
  return (
    <FormControlLabel
      control={
        <Switch checked={isAdmin} onChange={toggleAdmin} color="primary" />
      }
      label={isAdmin ? "Admin" : "User"}
    />
  );
};

export default ToggleSwitch;
