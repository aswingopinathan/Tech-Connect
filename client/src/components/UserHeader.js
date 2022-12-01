import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

export default function ButtonAppBar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
         
          <Typography onClick={()=>navigate('/')} variant="h6" component="div" sx={{ flexGrow: 1 ,cursor: "pointer"}}>
            TECH CONNECT
          </Typography>
          <Button onClick={()=>navigate('/signin')} color="inherit">Sign In</Button>
          <Button onClick={()=>navigate('/signup')} color="inherit">Sign Up</Button>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
