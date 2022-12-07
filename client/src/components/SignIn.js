// import * as React from "react";
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
import axios from "axios";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
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

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errEmail, setErrEmail] = useState("");
  const [errPass, setErrPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmail = () => {
    if (email === "" || email === " ") {
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

  const handlePass = () => {
    if (password === "" || password === " ") {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleEmail() && handlePass()) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",

          },
        };

        setLoading(true);
        const { data } = await axios.post(
          "/signin",
          {
            email: email,
            password: password,
          },
          config
        );

        console.log(data);
        // console.log('email',data.email);
        // console.log('error',data.error);

        if(data.email){
          localStorage.setItem("userInfo", JSON.stringify(data));
          setLoading(false);
          setError("");
          
          navigate("/user");
        }
        if(data.error){
          setError(data.error);
          setLoading(false);

        }
        
      } catch (error) {
        console.log(error);
        setError(error.response.data.error);
        setLoading(false);
      }
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
          {loading && <Loading />}
          {/* {hello?<p>{hello}</p>:""} */}

          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onKeyUp={() => handleEmail()}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span style={{ color: "red" }}>{errEmail}</span>

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onKeyUp={() => handlePass()}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span style={{ color: "red" }}>{errPass}</span>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {/* Forgot password? */}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
