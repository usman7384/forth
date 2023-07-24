import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

function Forth({list}) {

  const StackElem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }));


  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Stack spacing={2} alignItems="center">
          {list?.slice().reverse().map((item, key) => (
            <StackElem key={key}>{item}</StackElem>
          ))}
        </Stack>
      </Box>     
    </div>
  );
}

export default Forth;
