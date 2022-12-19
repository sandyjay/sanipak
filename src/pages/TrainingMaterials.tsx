import * as React from "react";
import Swal from "sweetalert2";
import moment from "moment";

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
  CircularProgress,
  CardMedia,
} from "@mui/material";
import VideoThumbnail from "react-video-thumbnail";
// import {
//   getDownloadURL,
//   getStorage,
//   listAll,
//   ref,
//   uploadBytesResumable,
// } from "firebase/storage";
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
} from "firebase/database";
import { useStore } from "../store.js";

// const storages = getStorage();

// Create a reference under which you want to list
// const listRef = ref(storages, "");

export default function TrainingMaterials() {
  const [{ user }] = useStore();
  const [open, setOpen] = React.useState(false);
  const [videos, setVideos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [show, setshow] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      try {
        let featuresRef = query(dbref(realtimedb, "videos"));
        get(featuresRef)
          .then((r) => {
            let arr = []
            r.forEach(v => {
              arr.push(v.toJSON())
            })
            setVideos(arr);
          })
          .catch((e) => {
            throw e;
          });
        // const itemsrefs = await listAll(listRef);
        // itemsrefs.items.forEach(async (item) => {
        //   try {
        //     const url = await getDownloadURL(item);
        //     setVideos((arr) => [...arr, url]);
        //   } catch (error) {
        //   }
        // });
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

  // const upload = async (e) => {
  //   setUploading(true);
  //   try {
  //     if (!e.target.files[0]) {
  //       alert("Please choose a file first!");
  //     }
  //     let arr = [];
  //     let featuresRef = query(
  //       dbref(realtimedb, "users"),
  //       orderByChild("userId"),
  //       limitToFirst(1),
  //       equalTo(user.localId)
  //     );
  //     get(featuresRef)
  //       .then((r) => {
  //         console.log("r");
  //         r.forEach((v) => {
  //           arr.push(v.toJSON());
  //         });
  //         console.log("arr", arr[0]);
  //         if (arr[0]?.isAdmin) {
  //           const storageRef = ref(
  //             storage,
  //             `/${Math.random() + e.target.files[0].name}`
  //           );
  //           const uploadTask = uploadBytesResumable(
  //             storageRef,
  //             e.target.files[0]
  //           );
  //           uploadTask.on(
  //             "state_changed",
  //             (snapshot) => {
  //               const percnt =
  //                 Math.round(
  //                   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //                 ) || 0;
  //               setPercent(percnt);
  //             },
  //             (err) => {
  //               throw err;
  //             },
  //             async () => {
  //               try {
  //                 const url = await getDownloadURL(uploadTask.snapshot.ref);
  //                 setVideos([url, ...videos]);
  //                 document.getElementById("images").value = "";
  //               } catch (e) {
  //                 throw e;
  //               } finally {
  //                 setUploading(false);
  //               }
  //             }
  //           );
  //         } else {
  //           setUploading(false);
  //           Swal.fire({
  //             title: "Error!",
  //             text: "Only admin can upload video.",
  //             icon: "error",
  //             timerProgressBar: true,
  //             showConfirmButton: true,
  //             confirmButtonColor: "#3699FF",
  //           });
  //         }
  //       })
  //       .catch((e) => {
  //         throw e;
  //       });
  //   } catch (error) {
  //     Swal.fire({
  //       title: "Error!",
  //       text: error || "Something went wrong",
  //       icon: "error",
  //       timerProgressBar: true,
  //       showConfirmButton: true,
  //       confirmButtonColor: "#3699FF",
  //     });
  //     document.getElementById("images").value = "";
  //   }
  // };

  const onSubmit = async (values) => {
    console.log('values', values)
    try {
      await push(dbref(realtimedb, "videos/"), {
        ...values,
      });
      setVideos([values, ...videos]);
      setOpen(false)
    } catch (error) {
      console.log('erere', error)
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
  console.log('setVideos', videos)

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
                  {/* <input
                id="images"
                name="images"
                type="file"
                multiple={false}
                onChange={upload}
                style={{ display: "none" }}
              />
                <label className="lbl"
                  style={{ pointerEvents: uploading ? 'none' : 'unset' }}
                  htmlFor="images">
                  {uploading ? <CircularProgress className="" size={30} color='primary' /> : "Upload video"}
                </label> */}
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
                      pb: "20px",
                    }}
                  >
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
      <VideoUploadingDialog
        open={open}
        onSubmit={onSubmit}
        onClose={() => {
          setOpen(false)
          document.getElementById("image").value = "";
          document.getElementById("video").value = "";
        }}
      />
    </>
  );
}
