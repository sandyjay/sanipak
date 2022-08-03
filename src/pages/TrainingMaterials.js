import * as React from "react";
import {
  Fab,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Container,
  Typography,
} from "@mui/material";
import ResponsiveAppBar from "./components/ResponsiveAppBar.js";
import PageHeader from "./components/PageHeader.tsx";
import Footer from "./components/Footer.tsx";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function TrainingMaterials() {
  return (
    <>
      <div className='page-materials'>
        <ResponsiveAppBar />
        <PageHeader heading='Training Materials' />
        <main>
          <Container sx={{ py: 8 }} maxWidth='lg'>
            {/* End hero unit */}
            <Grid container spacing={5}>
              {cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      pb: "20px",
                    }}
                  >
                    <CardMedia
                      component='img'
                      image='https://sanipak.com/wp-content/uploads/2022/08/paid-course.jpg'
                      alt='random'
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant='h5' component='h2'>
                        Heading
                      </Typography>
                      <Typography>
                        This is a media card. You can use this section to
                        describe the content.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Fab
                        variant='extended'
                        size='small'
                        color='primary'
                        aria-label='add'
                      >
                        Watch Video
                      </Fab>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </div>
      <Footer />
    </>
  );
}
