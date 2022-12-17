import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

function Copyright() {
  return (
    <Typography variant='body2' align='center'>
      © San-I-Pak World Health Systems 2022 All rights reserved
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box className='footer' component='footer'>
      <Copyright />
    </Box>
  );
}
