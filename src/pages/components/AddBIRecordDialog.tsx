import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";
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

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: any;
  onUpdate: any;
  editRow: object;
  updating: boolean
}
const vals = {
  date: new Date(),
  bi_lot: "",
  control_test: "",
  temp: "",
  color: "",
  timein: new Date(),
  timeout: new Date(),
  passfail: "",
  version: ""
}

const arr = [{ a: 'Date', b: 'date' },
{ a: 'BI lot#.', b: 'bi_lot' },
{ a: 'Control test', b: 'control_test' },
{ a: 'Color', b: 'color' },
{ a: 'Temperature', b: 'temp' },
{ a: 'Time in', b: 'timein' },
{ a: 'Time out', b: 'timeout' },
{ a: 'Status', b: 'passfail' },
{ a: 'Version', b: 'version' },
]
export default function AddBIRecordDialog({ open, updating, onSubmit,
  onClose,
  editRow, onUpdate }: Props) {
  const [inputValues, setInputValues] = useState<any>({
    ...vals,
    ...editRow
  });

  useEffect(() => {
    if (editRow) {
      setInputValues({ ...inputValues, ...editRow })
    }
  }, [editRow])

  const handleChange = (name, value) => {
    setInputValues({
      ...inputValues,
      [name]: value,
    });
    index && setindex(null)
  }

  const [index, setindex] = useState(null)

  const submit = () => {
    for (let key in inputValues) {
      if (typeof inputValues[key] == 'string' && !inputValues[key].trim().length) {
        setindex(key || '')
        return;
      }
    }
    if (editRow?.id) {
      onUpdate(inputValues)
    } else {
      onSubmit(inputValues);
    }
    setInputValues({ ...vals })
  };


  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add new BI record</DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Date"
              inputFormat="MM/dd/yyyy"
              onChange={(date) => handleChange("date", date)}
              value={inputValues.date
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField
            autoFocus
            margin="dense"
            label="BI Lot#"
            fullWidth
            value={inputValues.bi_lot}
            onChange={({ target: { value } }) => handleChange("bi_lot", value)}
          />
          <RadioGroup
            row
            value={inputValues.control_test}
            onChange={({ target: { value } }) =>
              handleChange("control_test", value)
            }
          >
            <FormControlLabel
              value="control"
              control={<Radio />}
              label="Control"
            />
            <FormControlLabel
              value="test"
              control={<Radio />}
              label="Test"
            />
          </RadioGroup>
          <TextField
            autoFocus
            margin="dense"
            label="Temp"
            type='number'
            value={inputValues.temp}
            onChange={({ target: { value } }) => handleChange("temp", value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Color"
            value={inputValues.color}
            onChange={({ target: { value } }) => handleChange("color", value)}
          />

          <TextField
            autoFocus
            margin="dense"
            label="Version"
            value={inputValues.version}
            onChange={({ target: { value } }) => handleChange("version", value)}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Time in"
              onChange={(e) => handleChange("timein", e)}
              value={inputValues.timein}
              renderInput={(params) => <TextField {...params} />}
            />
            <DateTimePicker
              label="Time out"
              onChange={(e) => handleChange("timeout", e)}
              value={inputValues.timeout}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <RadioGroup
            row
            value={inputValues.passfail}
            onChange={({ target: { value } }) => handleChange("passfail", value)}
          >
            <FormControlLabel value="pass" control={<Radio />} label="Pass" />
            <FormControlLabel value="fail" control={<Radio />} label="Fail" />
          </RadioGroup>
        </Stack>
      </DialogContent>
      <DialogActions >
        <Fade bottom collapse when={index}>
          <div className="invalid-feedback err" style={{ display: "block" }}>
            {arr.find(v => v.b === index)?.a} is required
          </div>
        </Fade>
        <Button disabled={updating} onClick={() => {
          onClose();
          setInputValues({ ...vals })
        }}>Cancel</Button>
        <Button onClick={submit}>{editRow?.id ? 'Update' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  );
}
