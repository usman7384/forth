import React from "react";
import Alert from '@mui/material/Alert';

function Notification({message}) {
  return (
    <div className="notification">
     <Alert severity="error">{message}</Alert>
    </div>
  );
}

export default Notification;