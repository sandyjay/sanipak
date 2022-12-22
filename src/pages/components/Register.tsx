// import React, { useState } from "react";
// import logo from "../../assets/logo.png";
// import { Button, TextField, Box, Container } from "@mui/material";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { auth } from "../../firebase-config";

// export default function Register() {
//   const [userEmail, setUserEmail] = useState("");
//   const [userPass, setUserPass] = useState("");
//   const [userName, setUserName] = useState("");

//   const register = async () => {
//     await createUserWithEmailAndPassword(auth, userEmail, userPass)
//       .then(updateUser)
//       .catch((e) => console.log("Error:", e));
//   };
//   const updateUser = async () => {
//     updateProfile(auth.currentUser, {
//       displayName: userName,
//     })
//       .then(() => {
//         console.log("Profile updated", auth.currentUser);
//       })
//       .catch((e) => console.log("Error:", e));
//   };

//   return (
//     <>
//       <Container
//         className='page-login'
//         sx={{
//           marginTop: 18,
//         }}
//         component='main'
//         maxWidth='xs'
//       >
//         <Box
//           sx={{
//             marginTop: 12,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <img src={logo} alt='logo' />

//           <Box component='form' noValidate sx={{ mt: 3 }}>
//             <TextField
//               margin='normal'
//               required
//               fullWidth
//               id='name'
//               label='Full name'
//               name='name'
//               autoFocus
//               onChange={(event) => setUserName(event.target.value)}
//             />
//             <TextField
//               margin='normal'
//               required
//               fullWidth
//               id='email'
//               label='Email Address'
//               name='email'
//               autoComplete='email'
//               autoFocus
//               onChange={(event) => setUserEmail(event.target.value)}
//             />
//             <TextField
//               margin='normal'
//               required
//               fullWidth
//               name='password'
//               label='Password'
//               type='password'
//               id='password'
//               autoComplete='current-password'
//               onChange={(event) => setUserPass(event.target.value)}
//             />
//           </Box>
//         </Box>
//         <Button
//           type='submit'
//           fullWidth
//           variant='contained'
//           sx={{ mt: 3, mb: 2 }}
//           onClick={register}
//         >
//           Register
//         </Button>
//       </Container>
//     </>
//   );
// }
