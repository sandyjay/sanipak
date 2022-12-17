import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ResponsiveAppBar from "./components/ResponsiveAppBar.js";
import PageHeader from "./components/PageHeader.tsx";
import Footer from "./components/Footer.tsx";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DataTable from "./components/DataTable.tsx";

export default function AdminPage() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className='page-admin'>
        <ResponsiveAppBar />
        <PageHeader heading='San-i-Pak admin' />
        <Box>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TabList
                onChange={handleChange}
                aria-label='lab API tabs example'
              >
                <Tab label='Users' value='1' />
                <Tab label='Facilities' value='2' />
                <Tab label='Records' value='3' />
                <Tab label='Training Material' value='4' />
              </TabList>
            </Box>
            <TabPanel value='1'>
              <main className='homebody'>
                <Container sx={{ py: 8 }} maxWidth='xl'></Container>
              </main>
            </TabPanel>
            <TabPanel value='2'>
              <main className='homebody'>
                <Container sx={{ py: 8 }} maxWidth='xl'>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={4}>
                      <Fab variant='extended' color='primary' size='small'>
                        Add Facility
                        <ArrowForwardIcon />
                      </Fab>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Fab variant='extended' color='primary' size='small'>
                        Edit Facility
                        <ArrowForwardIcon />
                      </Fab>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Fab variant='extended' color='primary' size='small'>
                        Remove Facility
                        <ArrowForwardIcon />
                      </Fab>
                    </Grid>
                  </Grid>
                </Container>
              </main>
            </TabPanel>
            <TabPanel value='3'>
              <Container maxWidth='xl' sx={{ marginBottom: "80px" }}>
                <DataTable />
              </Container>
            </TabPanel>
            <TabPanel value='4'>Tutorials </TabPanel>
          </TabContext>
        </Box>
      </div>
      <Footer />
    </>
  );
}
