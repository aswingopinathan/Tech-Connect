import React from 'react'
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import { useNavigate } from "react-router-dom";
import SendToMobileIcon from '@mui/icons-material/SendToMobile';


function Otp() {
    const theme = createTheme();
    const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [errOtp, setErrOtp] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOtp = () => {
    if (otp === "" || otp === " ") {
      setErrOtp("Please enter otp");
      return false;
    } else if (otp.length < 4 || otp.length > 4) {
      setErrOtp("Invalid OTP");
      return false;
    } else {
      setErrOtp("");
      return true;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleOtp()) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        setLoading(true);
        const { data } = await axios.post(
          "/verifyotp",
          {
            otp: otp,
          },
          config
        );
        console.log(data);
        setLoading(false);
        setError("");
if(data){

  navigate("/user");
}
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    } else if (!handleOtp()) {
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

          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <SendToMobileIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Verify OTP
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
           
            <TextField
            sx={{width:'400px'}}
              margin="normal"
              required
              fullWidth
              name="otp"
              label="Enter otp"
              type="number"
              id="otp"
            //   autoComplete="current-password"
              value={otp}
              onKeyUp={() => handleOtp()}
              onChange={(e) => setOtp(e.target.value)}
            />
            <span style={{ color: "red" }}>{errOtp}</span><br></br>

            <Button
              type="submit"
            //   fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              verify
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Resend OTP
                </Link>
              </Grid>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Back to home"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Otp