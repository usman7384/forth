import "./App.css";
import React from "react";
import { useState } from "react";
import Stack from "./stack";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import axios from "axios";
import Notification from "./notification";
import { buttonGroupStyle,buttonStyle, textAreaStyle } from "./styled-components";

function App() {
  const [expr, setExpr] = useState("");
  const [list, setList] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onClear = () => {
    setExpr("");
  };

  const onRun = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/forth", {
        prog:expr,
      });
      setList(response.data);
      setExpr("");
    } catch (e) {
      setError(true);
      setErrorMessage(e.response.data.error)
      setTimeout(()=>setError(false), 3000)
    }
  };

  const handleChange = (event: any) => {
 setExpr(event.target.value)
  };

  return (
    <div className="App">
      {error? <Notification message={errorMessage}/> : false}
      <h1>Forth Interpreter</h1>
      <Stack list={list} />
      <div>
        <TextField
          id="filled-textarea"
          label="Expression"
          placeholder="Expression"
          variant="filled"
          value={expr}
          onChange={handleChange}
          sx={textAreaStyle}
        />
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
          sx={buttonGroupStyle}
        >
          <Button sx={buttonStyle} onClick={onRun}>
            Run
          </Button>
          <Button sx={buttonStyle} onClick={onClear}>
            Clear
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export { App };
