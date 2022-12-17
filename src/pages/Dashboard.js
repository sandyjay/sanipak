import * as React from "react";
import { Grid, Container } from "@mui/material";
import ResponsiveAppBar from "./components/ResponsiveAppBar.js";
import ActionCard from "./components/ActionCard.tsx";
import PageHeader from "./components/PageHeader.tsx";
import Footer from "./components/Footer.tsx";

export default function Dashboard() {
  return (
    <>
      <div className='page-dashboard'>
        <ResponsiveAppBar />
        <PageHeader
          heading='Welcome to San-i-Pak portal'
          description="Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely."
        />
        <main className='homebody'>
          <Container sx={{ py: 8 }} maxWidth='xl'>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <ActionCard
                  title='Cycles Record'
                  description='Click here to log in to cycles records application.'
                  buttonText='Login'
                  buttonlink='https://records.sanipak.com/'
                  image='https://sanipak.com/wp-content/uploads/2022/08/cycles-record.gif'
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <ActionCard
                  title='BI Records'
                  description='Click here to add, remove or edit BI log sheets.'
                  buttonText='Access'
                  buttonlink='/bi-records'
                  image='https://sanipak.com/wp-content/uploads/2022/08/bi-records.gif'
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <ActionCard
                  title='Training Materials'
                  description='Click here to access training material.'
                  buttonText='Access'
                  buttonlink='/training-materials'
                  image='https://sanipak.com/wp-content/uploads/2022/08/training.gif'
                />
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
      <Footer />
    </>
  );
}
