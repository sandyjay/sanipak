import React, { useState } from "react";
import logo from "../assets/logo.png";
import Swal from "sweetalert2";
import { realtimedb } from "../db.js";
import {
  ref,
  get,
  query,
  orderByChild,
  equalTo,
  limitToFirst,
} from "firebase/database";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Container,
  CircularProgress,
} from "@mui/material";
import { useStore } from "../store";
import { Navigate, useNavigate } from "react-router-dom";
import { AUTH_SUCCESS } from "../actionTypes";

function Login() {
  const [{ user }, dispatch] = useStore();
  const auth = !!user?.idToken;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [inputValues, setInputs] = useState({
    email: "",
    password: "",
  });

  const change = (e) =>
    setInputs({
      ...inputValues,
      [e.target.name || e.target.id]: e.target.value,
    });

  const onsubmit = async () => {
    setIsLoading(true);
    try {
      const { email, password } = inputValues;
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );
      const data = await res.json();
      if (data.error?.errors) {
        throw data.error?.message;
      } else {
        let featuresRef = query(
          ref(realtimedb, "users"),
          orderByChild("userId"),
          limitToFirst(1),
          equalTo(data.localId)
        );
        get(featuresRef)
          .then((r) => {
            let arr = []
            r.forEach(v => {
              arr.push(v.toJSON())
            })
            dispatch({ type: AUTH_SUCCESS, payload: { user: { ...data, ...arr[0] } } });
            setIsLoading(false);
            navigate("/dashboard");
          })
          .catch((e) => {
            throw e;
          });
      }
    } catch (error) {
      setIsLoading(false);
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

  if (auth) {
    return <Navigate to="dashboard" />;
  }

  return (
    <>
      <Container
        className="page-login"
        sx={{
          marginTop: 18,
        }}
        component="main"
        maxWidth="xs"
      >
        <Box
          sx={{
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="logo" />

          <Box component="form" noValidate sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={inputValues.email}
              onChange={change}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={inputValues.password}
              onChange={change}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // href={"/dashboard"}
              disabled={
                !Object.values(inputValues).every((v) => v.trim().length) ||
                isLoading
              }
              onClick={onsubmit}
            >
              {isLoading ? (
                <CircularProgress
                  color="primary"
                  className=""
                  style={{ margin: "auto" }}
                />
              ) : (
                "Sign In"
              )}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link variant="body2">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link variant="body2">
                  {/* target='_blank'  */}
                  <a href="mailto:sj@m.co">
                    Don't have an account? Request one.
                  </a>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Login;
