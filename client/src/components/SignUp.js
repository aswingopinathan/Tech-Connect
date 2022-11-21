import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import axios from "axios";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        TECH CONNECT
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const [errName, setErrName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errMob, setErrMob] = useState("");
  const [errPass, setErrPass] = useState("");
  const [errcPass, setErrcPass] = useState("");


  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleName = () => {
    if (name == "" || name == " ") {
      setErrName("Name cannot be empty");
      return false;
    } else {
      setErrName("");
      return true;
    }
  };
  const handlePass = () => {
    if (password == "" || password == " ") {
      setErrPass("Password cannot be empty");
      return false;
    } else if (password.length < 6) {
      setErrPass("Password must be atleast 6 characters");
      return false;
    } else {
      setErrPass("");
      return true;
    }
  };
 
  const handleMobile = () => {
    if (mobile == "" || mobile == " ") {
      setErrMob("Mobile number cannot be empty");
      return false;
    } else if (mobile.length < 10 || mobile.length > 10) {
      setErrMob("Invalid mobile number");
      return false;
    } else {
      setErrMob("");
      return true;
    }
  };
  const handleEmail = () => {
    if (email == "" || email == " ") {
      setErrEmail("Email cannot be empty");
      return false;
    } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setErrEmail("Enter a proper email");
      return false;
    } else {
      setErrEmail("");
      return true;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleEmail() && handleMobile() && handleName() && handlePass()) {
      if (password !== confirmpassword) {
        setMessage("Passwords do not match");
      } else {
        setMessage("");
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };

          setLoading(true);
          const { data } = await axios.post(
            "/signup",
            { name: name, email: email, password: password,mobile: mobile, pic: pic },
            config
          );

          console.log(data);

          setLoading(false);
          localStorage.setItem("userInfo", JSON.stringify(data));
          setLoading(false);
          setError("");
          
          navigate("/otp");
        } catch (error) {
          setError(error.response.data.message);
          setLoading(false);
        }
      }
      console.log(email);
    } else if (
      !handleEmail() &&
      !handleMobile() &&
      !handleName() &&
      !handlePass()
    ) {
    }
  };

  const uploadStyle = { margin: 20 };

  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please select an image");
    }
    setPicMessage(null);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "techconnect");
      data.append("cloud_name", "dtsqr3v76");
      fetch("https://api.cloudinary.com/v1_1/dtsqr3v76/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please select an image");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {error && <ErrorMessage varient="danger">{error}</ErrorMessage>}
          {/* {message && <ErrorMessage varient="danger">{message}</ErrorMessage>} */}
          {loading && <Loading />}

          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  autoFocus
                  value={name}
                  onKeyUp={() => handleName()}
                  onChange={(e) => setName(e.target.value)}
                />
                <span style={{ color: "red" }}>{errName}</span>
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onKeyUp={() => handleEmail()}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span style={{ color: "red" }}>{errEmail}</span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onKeyUp={() => handlePass()}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span style={{ color: "red" }}>{errPass}</span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="ConfirmPassword"
                  type="password"
                  id="confirmpassword"
                  autoComplete="confirm-password"
                  value={confirmpassword}
                  onKeyUp={() => handlePass()}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span style={{ color: "red" }}>{errPass}</span>
                <span style={{ color: "red" }}>{message}</span>

              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="mobile"
                  label="Mobile"
                  type="number"
                  id="mobile"
                  autoComplete="enter-mobile"
                  value={mobile}
                  onKeyUp={() => handleMobile()}
                  onChange={(e) => setMobile(e.target.value)}
                />
                <span style={{ color: "red" }}>{errMob}</span>
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  // required
                  fullWidth
                  name="pic"
                  label="Upload pic"
                  type="image/png"
                  id="pic"
                  autoComplete="pic"
                />
              </Grid> */}
              {picMessage && (
                <ErrorMessage varient="danger">{picMessage}</ErrorMessage>
              )}
              <Button style={uploadStyle} variant="contained" component="label">
                Upload Pic
                <input
                  type="file"
                  onChange={(e) => postDetails(e.target.files[0])}
                  hidden
                />
              </Button>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
