import * as React from "react";
import { Fab, Container, Box } from "@mui/material";
import ResponsiveAppBar from "./components/ResponsiveAppBar.js";
import Footer from "./components/Footer.tsx";
import PageHeader from "./components/PageHeader.tsx";
import { useState } from "react";
import AddBIRecordDialog from "./components/AddBIRecordDialog.tsx";
import AddIcon from "@mui/icons-material/Add";
import DataTable from "./components/DataTable.tsx";

export default function BIRecords() {
  const [BIDialogVisible, setBIDialogVisible] = useState(false);

  return (
    <>
      <div className='page-biRecords'>
        <ResponsiveAppBar />
        <PageHeader heading='BI Records' />
        <Container maxWidth='xl'>
          <Box sx={{ py: 5, m: 1, display: "flex", justifyContent: "end" }}>
            <Fab
              sx={{ mr: 1 }}
              variant='extended'
              size='small'
              onClick={() => setBIDialogVisible(true)}
            >
              Bulk Import
            </Fab>
            <Fab
              variant='extended'
              color='primary'
              size='small'
              onClick={() => setBIDialogVisible(true)}
            >
              <AddIcon />
              Add new record
            </Fab>
          </Box>
        </Container>

        <Container maxWidth='xl' sx={{ marginBottom: "80px" }}>
          <DataTable />
        </Container>
      </div>
      <Footer />
      <AddBIRecordDialog
        open={BIDialogVisible}
        onClose={() => setBIDialogVisible(false)}
      />
    </>
  );
}
