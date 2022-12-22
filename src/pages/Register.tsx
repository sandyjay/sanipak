import React, { useState } from "react";
import logo from "../assets/logo.png";
import Swal from 'sweetalert2'
import { realtimedb } from "../db.js";

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
  Radio,
  RadioGroup,
} from "@mui/material";
import { useStore } from "../store";
import { Navigate, useNavigate } from "react-router-dom";
import { AUTH_SUCCESS } from "../actionTypes";
import {
  ref,
  push,
} from "firebase/database";

function Register() {
  const [{ user }, dispatch] = useStore();
  const auth = !!user?.idToken
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
    name: '',
    facility: '',
    referenceId: '',
    isAdmin: false
  })

  const change = (e) => setInputValues({ ...inputValues, [e.target.name || e.target.id]: e.target.value })
  const onsubmit = async () => {
    setIsLoading(true)
    try {
      const { email, password, name, isAdmin } = inputValues;
      const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      })
      const data = await res.json();
      if (data.error?.errors) {
        throw data.error?.errors
      }
      await push(ref(realtimedb, 'users/'), {
        email,
        isAdmin: !!(isAdmin === 'admin'),
        isSpecialUser: !(isAdmin === 'admin'),
        userId: data.localId, // generetad by firebase
        name,
        password,
        facility: '',
        internalId: ''
      });
      dispatch({ type: AUTH_SUCCESS, payload: { user: data } })
      navigate('/dashboard')

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error || 'Something went wrong',
        icon: 'error',
        timerProgressBar: true,
        showConfirmButton: true,
        confirmButtonColor: "#3699FF",
      })
    }
    finally {
      setIsLoading(false)
    }
  }

  if (auth) {
    return <Navigate to='dashboard' />
  }

  return (
    <>
      <Container
        className='page-login'
        sx={{
          marginTop: 18,
        }}
        component='main'
        maxWidth='xs'
      >
        <Box
          sx={{
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={logo} alt='logo' />

          <Box component='form' noValidate sx={{ mt: 3 }}>

            <TextField
              margin='normal'
              required
              fullWidth
              id='name'
              label='Full Name'
              name='name'
              autoFocus
              value={inputValues.name}
              onChange={change}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={inputValues.email}
              onChange={change}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={inputValues.password}
              onChange={change}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='facility'
              label='Facility'
              id='facility'
              value={inputValues.facility}
              onChange={change}
            /> <TextField
              margin='normal'
              required
              fullWidth
              name='referenceId'
              label='Reference Id'
              id='referenceId'
              value={inputValues.referenceId}
              onChange={change}
            />
            <RadioGroup
              row
              name="isAdmin"
              id="isAdmin"
              value={inputValues.isAdmin}
              onChange={change}
            >
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="Admin user"
              />
              <FormControlLabel
                value="specific"
                control={<Radio />}
                label="Specific user"
              />
            </RadioGroup>
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              // href={"/dashboard"}
              disabled={!Object.values(inputValues).every(v => v.trim().length) || isLoading}
              onClick={onsubmit}
            >
              {isLoading ? <CircularProgress color="primary" className="" style={{ margin: 'auto' }} /> : "Sign Up"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link variant='body2' onClick={() => navigate('/')}>
                  Already have an account?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}


export default Register;
