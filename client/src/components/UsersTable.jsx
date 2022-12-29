import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import { Button } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));





function UsersTable() {

const [allUsers,setAllUsers] = useState([])
const [blockUpdate,setBlockUpdate] = useState(false)


let token = JSON.parse(localStorage.getItem("userInfo"))?.token;

const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };

useEffect(()=>{
    const getUserData = async () => {
        const { data } = await axios.get('/admin/users',config)
    console.log('data',data);
    setAllUsers(data)
    }
    getUserData()
    // eslint-disable-next-line
},[blockUpdate])

    const blockUser = (id,value)=>{
        // console.log('id',id);
        // console.log('value',value);
        axios.post('/admin/blockuser',{
            userId:id,
            block:value,
        },config).then(()=>{
            setBlockUpdate(Math.random())
        })
    }

  return (
    <div style={{marginTop:'60px',marginLeft:'250px',marginRight:'10px',backgroundColor:'yellow'}}>
      <div>UsersTable</div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>USER ID</StyledTableCell>
            <StyledTableCell>NAME</StyledTableCell>
            <StyledTableCell>EMAIL</StyledTableCell>
            <StyledTableCell>MOBILE</StyledTableCell>
            <StyledTableCell>STATUS</StyledTableCell>
            {/* <StyledTableCell align="right">REPORTS</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers.map((allUser) => (
            <StyledTableRow key={allUser._id}>
                <StyledTableCell component="th" scope="row">
                {allUser._id}
              </StyledTableCell>
              {/* <StyledTableCell component="th" scope="row">
                {allUser.name}
              </StyledTableCell> */}
              <StyledTableCell component="th" scope="row">{allUser.name}</StyledTableCell>
              <StyledTableCell component="th" scope="row">{allUser.email}</StyledTableCell>
              <StyledTableCell component="th" scope="row">{allUser.mobile}</StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {allUser.block?(<Button
                variant='contained'
                color='error'
                onClick={()=>{
                    // console.log('block now');
                    blockUser(allUser._id,false)
                }}
                >blocked</Button>):(<Button
                    variant='contained'
                    onClick={()=>{
                        console.log('block now');
                        blockUser(allUser._id,true)
                    }}
                    >unblocked</Button>)}
              </StyledTableCell>
              {/* <StyledTableCell align="right">report</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default UsersTable;
