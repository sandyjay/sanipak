import * as React from "react";
import Swal from "sweetalert2";
import moment from 'moment'
import ResponsiveAppBar from "./components/ResponsiveAppBar.js";
import Footer from "./components/Footer.tsx";
import PageHeader from "./components/PageHeader.tsx";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Fab, Container, Box } from "@mui/material";
import AddBIRecordDialog from "./components/AddBIRecordDialog.tsx";
import DataTable from "./components/DataTable.tsx";
import { realtimedb } from "../db.js";
import {
  ref,
  set, update, get,
  remove, push, orderByChild, equalTo
  , query,
} from "firebase/database";
import { useStore } from "../store.js";


export default function BIRecords() {
  const [show, setShow] = useState(false);
  const [{ user }, dispatch] = useStore()
  const [editRow, setEditRow] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [records, setRecords] = useState([])

  const fetchHandler = async () => {
    try {
      let featuresRef = query(ref(realtimedb, 'records'), orderByChild('userId'), equalTo(user.localId))
      let arr = []
      get(featuresRef).then(r => {
        r.forEach(v => {
          arr.push({ id: v.key, ...v.toJSON() })
        })
        setIsLoading(false);
        setRecords(arr)
      })
        .catch(e => {
          throw e
        })
    } catch (error) {
      Swal.fire({
        text: error?.message || "Something Went wrong",
        icon: "error",
        title: "Error",
        timerProgressBar: true,
        showConfirmButton: true,
        confirmButtonColor: "#3699FF",
      });
    }
  }

  React.useEffect(() => {
    fetchHandler()
  }, [])


  const onDelete = async ids => {
    setUpdating(true)
    try {
      ids.forEach(async v => {
        await remove(ref(realtimedb, `records/${v}`));
      })
      setRecords(records.filter(v => !ids.includes(v.id)))
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error || "Something went wrong",
        icon: "error",
        timerProgressBar: true,
        showConfirmButton: true,
        confirmButtonColor: "#3699FF",
      });
    }
    finally {
      setUpdating(false)
    }
  }

  const onSubmit = async (values) => {
    // console.log('onSubmit');
    try {
      setUpdating(true);
      const data = await push(ref(realtimedb, 'records/'), {
        ...values,
        date: moment(values.date).format(),
        timein: moment(values.timein).format(),
        timeout: moment(values.timeout).format(),
        userId: user.localId
      });
      setRecords(p => [{ id: data.key, ...values }, ...p])
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error || "Something went wrong",
        icon: "error",
        timerProgressBar: true,
        showConfirmButton: true,
        confirmButtonColor: "#3699FF",
      });
    } finally {
      setUpdating(false);
      setShow(false);
    }
  };

  const onUpdate = async (values) => {
    const arr = [...records]
    try {
      setUpdating(true);
      await set(ref(realtimedb, `records/${values.id}`), {
        ...values,
        date: moment(values.date).format(),
        timein: moment(values.timein).format(),
        timeout: moment(values.timeout).format()
      });
      const i = arr.findIndex(val => val.id == values.id)
      arr[i] = values
      setRecords(arr)
    } catch (error) {
      return Swal.fire({
        title: "Error!",
        text: error || "Something went wrong",
        icon: "error",
        timerProgressBar: true,
        showConfirmButton: true,
        confirmButtonColor: "#3699FF",
      });
    } finally {
      setUpdating(false);
      setShow(false);
      setEditRow(null)
      setRecords(arr)
    }
  }

  return (
    <>
      <div className="page-biRecords">
        <ResponsiveAppBar />
        <PageHeader heading="BI Records" />
        <Container maxWidth="xl">
          <Box sx={{ py: 5, m: 1, display: "flex", justifyContent: "end" }}>
            <Fab
              sx={{ mr: 1 }}
              variant="extended"
              size="small"
              onClick={() => ''}
            >
              Bulk Import
            </Fab>
            <Fab
              variant="extended"
              color="primary"
              size="small"
              onClick={() => setShow(true)}
            >
              <AddIcon />
              Add new record
            </Fab>
          </Box>
        </Container>
        <Container maxWidth="xl" sx={{ marginBottom: "80px" }}>
          <DataTable data={records} setEditRow={(v) => setEditRow(v)}
            isLoading={isLoading} onDelete={onDelete} />
        </Container>
      </div>
      <Footer />
      <AddBIRecordDialog open={show || !!editRow?.id}
        editRow={editRow}
        onUpdate={onUpdate}
        onSubmit={onSubmit}
        updating={updating}
        onClose={() => {
          setShow(false);
          setEditRow(null)
        }} />
    </>
  );
}
