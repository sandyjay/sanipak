import * as React from "react";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";

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
  CardMedia,
  IconButton,
} from "@mui/material";
import VideoThumbnail from "react-video-thumbnail";

import ResponsiveAppBar from "./components/ResponsiveAppBar.js";
import PageHeader from "./components/PageHeader.tsx";
import Footer from "./components/Footer.tsx";
// import storage from "./s.js";
import { realtimedb } from "../db.js";
import VideoUploadingDialog from "./components/VideoUploadingDialog.tsx";
import {
  ref as dbref,
  get,
  query,
  push,
  remove,
  ref,
} from "firebase/database";
import { useStore } from "../store.js";



export default function TrainingMaterials() {
  const [{ user }] = useStore();
  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(null);
  const [videos, setVideos] = React.useState([]);
  const [show, setshow] = React.useState(null);


  React.useEffect(() => {
    (async () => {
      try {
        let featuresRef = query(dbref(realtimedb, "videos"));
        get(featuresRef)
          .then((r) => {
            let arr = []
            r.forEach(v => {
              arr.push({ id: v.key, ...v.toJSON() })
            })
            setVideos(arr);
          })
          .catch((e) => {
            throw e;
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
      }
    })();
  }, []);

  const onDelete = async () => {
    try {
      await remove(ref(realtimedb, `videos/${deleteOpen.id}`));
      setVideos(videos.filter(v => v.id !== deleteOpen.id))
      setDeleteOpen(null)
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


  const onSubmit = async (values: any) => {
    try {
      await push(dbref(realtimedb, "videos/"), {
        ...values,
      });
      setVideos([values, ...videos]);
      setOpen(false)
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
            <div style={{ marginBottom: "20px", display: "flex" }}>
              {user.isAdmin ? (
                <>
                  <Button
                    variant="contained"
                    onClick={() => setOpen(true)}
                    className=""
                  >
                    Add Video{" "}
                  </Button>

                </>
              ) : null}
            </div>
            {/* End hero unit */}
            <Grid container spacing={5}>
              {videos.map((v, i) => (
                <Grid item key={i} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      pb: "20px", position: 'relative'
                    }}
                  >
                    <IconButton className="pos" style={{
                      position: 'absolute',
                      right: 10, top: 10, color: 'white'
                    }} onClick={() => setDeleteOpen(v)}>
                      <DeleteIcon />
                    </IconButton>
                    <CardMedia
                      component='img'
                      image={v.image}
                      alt='random'
                    />
                    <div
                      className=""
                      style={{ height: "200px", width: "200px" }}
                    >
                      <VideoThumbnail videoUrl={v} width={200} height={200} />
                    </div>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {v.title}
                      </Typography>
                      <Typography>
                        {v.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Fab
                        variant="extended"
                        size="small"
                        color="primary"
                        onClick={() => setshow(v.video)}
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
      <VideoUploadingDialog
        open={open}
        onSubmit={onSubmit}
        onClose={() => {
          setOpen(false)
          document.getElementById("image").value = "";
          document.getElementById("video").value = "";
        }}
      />








      <Dialog open={deleteOpen?.video} onClose={() => setDeleteOpen(null)} fullWidth>
        <DialogTitle>Delete video</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this video?

        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDeleteOpen(null)
            }}
          >
            Cancel
          </Button>
          <Button onClick={onDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
