import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddBIRecordDialog(props: Props) {
  function handleClose() {
    props.onClose();
  }
  const [value, setValue] = useState(new Date("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <Dialog open={props.open} onClose={handleClose} fullWidth>
      <DialogTitle>Add new BI record</DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label='Date'
              inputFormat='MM/dd/yyyy'
              onChange={handleChange}
              value={value}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='BI Lot#'
            fullWidth
          />
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='row-radio-buttons-group'
          >
            <FormControlLabel
              value='test'
              control={<Radio />}
              label='Control'
            />
            <FormControlLabel
              value='disabled'
              disabled
              control={<Radio />}
              label='Test'
            />
          </RadioGroup>
          <TextField autoFocus margin='dense' id='name' label='Temp' />
          <TextField autoFocus margin='dense' id='name' label='Color' />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label='Time in'
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
            <DateTimePicker
              label='Time out'
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='row-radio-buttons-group'
          >
            <FormControlLabel value='test' control={<Radio />} label='Pass' />
            <FormControlLabel
              value='disabled'
              disabled
              control={<Radio />}
              label='Fail'
            />
          </RadioGroup>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
