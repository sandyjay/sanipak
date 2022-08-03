import * as React from "react";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";

interface Props {
  heading: string;
  description?: string;
}

export default function PageHeader(props: Props) {
  return (
    <Box className='pageHeader'>
      <Container maxWidth='sm'>
        <h1> {props.heading} </h1>
        {props.description && <p>{props.description}</p>}
      </Container>
    </Box>
  );
}
