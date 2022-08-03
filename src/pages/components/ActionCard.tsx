import { Card, CardContent, CardMedia, Fab, Typography } from "@mui/material";
import * as React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface Props {
  title: string;
  description: string;
  buttonText: string;
  buttonlink: string;
  image: string;
}

export default function ActionCard(props: Props) {
  return (
    <Card>
      <CardMedia component='img' src={props.image} alt='dashboard'></CardMedia>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant='h3' component='h3'>
          {props.title}
        </Typography>
        <Typography>{props.description}</Typography>
        <Fab
          variant='extended'
          color='primary'
          size='small'
          href={props.buttonlink}
        >
          {props.buttonText}
          <ArrowForwardIcon />
        </Fab>
      </CardContent>
    </Card>
  );
}
