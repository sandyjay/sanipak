import React, { useState } from "react";
import { Fade } from "react-reveal";
import Swal from "sweetalert2";

import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from "@mui/material";

import { app } from "../s";

const storage = getStorage(app);

const vals = {
    title: "",
    description: "",
    image: "",
    video: ''
};

function VideoUploadingDialog({ open, onClose, loading, onSubmit }) {
    const [inputValues, setInputValues] = useState({
        ...vals,
    });
    const [names, setNames] = useState({
        image: '', video: ''
    });


    const [uploading, setUploading] = useState('');

    const handleChange = (name, value) => {
        setInputValues({
            ...inputValues,
            [name]: value,
        });
        // index && setindex(null)
    };

    const upload = async (e) => {
        const { name, id } = e.target
        setUploading(name || id);
        try {
            if (!e.target.files[0]) {
                alert(`Please choose a {name} first!`);
            }
            const storageRef = ref(
                storage,
                `/${Math.random() + e.target.files[0].name}`
            );
            const uploadTask = uploadBytesResumable(storageRef,
                e.target.files[0]
            );
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // const percnt = Math.round(
                    //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    // );
                },
                (err) => {
                    setUploading('')
                    throw err;
                },
                async () => {
                    try {
                        const url = await getDownloadURL(uploadTask.snapshot.ref);
                        setInputValues({ ...inputValues, [name || id]: url });
                        setNames({ ...names, [name || id]: e.target.files[0].name });
                        document.getElementById("image").value = "";
                        document.getElementById("video").value = "";
                    } catch (e) {
                        throw e;
                    } finally {
                        setUploading('');
                    }
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
            document.getElementById("image").value = "";
            document.getElementById("video").value = "";
        }
    };

    const submit = () => {
        onSubmit(inputValues)
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Add new video</DialogTitle>
            <DialogContent>
                <Stack spacing={3}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        value={inputValues.title}
                        onChange={({ target: { value } }) => handleChange("title", value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Description"
                        value={inputValues.description}
                        onChange={({ target: { value } }) =>
                            handleChange("description", value)
                        }
                    />
                    <div style={{
                        marginBottom: "20px", display: "flex",
                        flexDirection: 'column'
                    }}>
                        <input
                            id="image"
                            name="image"
                            type="file"
                            multiple={false}
                            onChange={upload}
                            style={{ display: "none" }}
                        />
                        <label
                            className="lbl"
                            style={{ pointerEvents: !!uploading ? "none" : "unset" }}
                            htmlFor="image"
                        >
                            {uploading === 'image' ? (
                                <CircularProgress className="" size={30} color="primary" />
                            ) : (
                                "Upload Thumbnail"
                            )}
                        </label>
                        <br />
                        <p>{names.image}</p>
                    </div>

                    <div style={{
                        marginBottom: "20px", display: "flex",
                        flexDirection: 'column'
                    }}>
                        <input
                            id="video"
                            name="video"
                            type="file"
                            multiple={false}
                            onChange={upload}
                            style={{ display: "none" }}
                        />
                        <label
                            className="lbl"
                            style={{ pointerEvents: !!uploading ? "none" : "unset" }}
                            htmlFor="video"
                        >
                            {uploading === 'video' ? (
                                <CircularProgress className="" size={30} color="primary" />
                            ) : (
                                "Upload video"
                            )}
                        </label>
                        <p>{names.video}</p>
                    </div>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Fade bottom collapse when={"index"}>
                    <div className="invalid-feedback err" style={{ display: "block" }}>
                        {/* {arr.find(v => v.b == index)?.a} is required */}
                    </div>
                </Fade>
                <Button
                    disabled={loading}
                    onClick={() => {
                        onClose();
                        setInputValues({ ...vals });
                    }}
                >
                    Cancel
                </Button>
                <Button onClick={submit}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}

export default VideoUploadingDialog;
