import * as React from "react";
import Swal from "sweetalert2";
import {
  Fab,
  Card,
  CardActions,
  CardContent,
  Grid,
  Container,
  Typography,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  Box,
} from "@mui/material";
import VideoThumbnail from "react-video-thumbnail";
import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import ResponsiveAppBar from "./components/ResponsiveAppBar.js";
import PageHeader from "./components/PageHeader.tsx";
import Footer from "./components/Footer.tsx";
import storage from "./s.js";

const storages = getStorage();

// Create a reference under which you want to list
const listRef = ref(storages, "");

export default function TrainingMaterials() {
  const [percent, setPercent] = React.useState('');
  const [videos, setVideos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [show, setshow] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        const itemsrefs = await listAll(listRef);
        itemsrefs.items.forEach(async (item) => {
          try {
            const url = await getDownloadURL(item);
            setVideos((arr) => [...arr, url]);
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
        });
      } catch (error) {
        Swal.fire({
          text: error?.message || "Something Went wrong",
          icon: "error",
          title: "Error",
          timerProgressBar: true,
          showConfirmButton: true,
          confirmButtonColor: "#3699FF",
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const upload = async (e) => {
    try {
      if (!e.target.files[0]) {
        alert("Please choose a file first!");
      }
      setUploading(true);
      const storageRef = ref(storage, `/${e.target.files[0].name}`);
      const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percnt = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          setPercent(percnt);
        },
        (err) => {
          Swal.fire({
            title: "Error!",
            text: err || "Something went wrong",
            icon: "error",
            timerProgressBar: true,
            showConfirmButton: true,
            confirmButtonColor: "#3699FF",
          });
        },
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              setVideos([url, ...videos]);
            })
            .catch((e) => {
              Swal.fire({
                title: "Error!",
                text: e || "Something went wrong",
                icon: "error",
                timerProgressBar: true,
                showConfirmButton: true,
                confirmButtonColor: "#3699FF",
              });
            })
            .finally(() => {
              setUploading(false);
            });
        }
      );
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
  };

  return (
    <>
      <div className="page-materials">
        <ResponsiveAppBar />
        <PageHeader heading="Training Materials" />
        <main>
          <Container sx={{ py: 8 }} maxWidth="lg">
            <div style={{ marginBottom: '20px', display: 'flex' }}> <input
              id="images"
              name="images"
              type="file"
              multiple={false}
              onChange={upload}
              style={{ display: "none" }}
            />{" "}
              <label className="lbl"
                style={{ pointerEvents: uploading ? 'none' : 'unset' }}
                variant="contained" for="images">
                Upload video
              </label>
              {/* <p>{percent}</p> */}
            </div>
            {/* End hero unit */}
            <Grid container spacing={5}>
              {videos.map((v, i) => (
                <Grid item key={i} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      pb: "20px",
                    }}
                  >
                    {/* <CardMedia
                      component='img'
                      image='https://sanipak.com/wp-content/uploads/2022/08/paid-course.jpg'
                      alt='random'
                    /> */}
                    <div
                      className=""
                      style={{ height: "200px", width: "200px" }}
                    >
                      <VideoThumbnail videoUrl={v} width={200} height={200} />
                    </div>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Heading
                      </Typography>
                      <Typography>
                        This is a media card. You can use this section to
                        describe the content.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Fab
                        variant="extended"
                        size="small"
                        color="primary"
                        onClick={() => setshow(v)}
                        aria-label="add"
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
      <Dialog
        open={!!show}
        className="video"
        onClose={() => setshow("")}
        onBackdropClick={() => setshow("")}
      >
        <DialogTitle>Media</DialogTitle>
        <DialogContent style={{}}>
          <Box sx={{ bgcolor: "background.paper", width: 500 }}>
            <video style={{ width: "inherit" }} controls>
              <source src={show} type="video/mp4" />
              Your browser does not support HTML video.
            </video>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setshow("")}>
            Close{" "}
          </Button>{" "}
        </DialogActions>
      </Dialog>
    </>
  );
}
