import React from 'react'
import { Box,ThemeProvider } from "@mui/material"
import theme from '../theme'
import TeacherSideDrawer from './TeacherSideDrawer';
import {TableCell,tableCellClasses,TableRow,TableContainer,Table,TableHead,TableBody} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Paper }from '@mui/material';
import { Button} from '@mui/material';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
   
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
  
      backgroundColor: '#ccfceb',
  
      // backgroundColor: theme.palette.secondary.main,
  
      color: theme.palette.common.white
    },
  }));

function TeacherGradeBook() {
  return (
    <Box>
            <ThemeProvider theme={theme}>
          <TeacherSideDrawer/> 
        <Box 
        sx={{ml: `calc(${theme.spacing(7)} + 15px)`,
        display:'flex', 
        justifyContent:'space-between',
        height:'100vh',
        overflowY:'hidden',
        }}>
            <Box sx={{mt:1}}>
            <Button size="small" color="primary" variant="contained" sx={{ml:1}}>
                   Course
                 </Button>
            <TableContainer component={Paper} style={{margin:'5px',width:'100vw'}}>
      <Table  aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell >Full Name</StyledTableCell>
              <StyledTableCell >Attendance</StyledTableCell>
              <StyledTableCell >Individual Assignment</StyledTableCell>
              <StyledTableCell >Group Assignment</StyledTableCell>
              <StyledTableCell >Mid Exam</StyledTableCell>
              <StyledTableCell >Final Exam</StyledTableCell>
              <StyledTableCell ></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <StyledTableRow >
              <StyledTableCell >Full Name</StyledTableCell>
              <StyledTableCell ><TextField id="standard-basic" label="Attendance" variant="standard" /></StyledTableCell>
              <StyledTableCell ><TextField id="standard-basic" label="Individual Assignment" variant="standard" /></StyledTableCell>
              <StyledTableCell ><TextField id="standard-basic" label="Group Assignment" variant="standard" /></StyledTableCell>
              <StyledTableCell ><TextField id="standard-basic" label="Mid Exam" variant="standard" /></StyledTableCell>
              <StyledTableCell ><TextField id="standard-basic" label="Final Exam" variant="standard" /></StyledTableCell>
              <StyledTableCell ><CheckIcon sx={{color:'#68cca9',mr:1}}/> <ModeEditIcon sx={{color:'#68cca9'}}/> </StyledTableCell>
              
              
            </StyledTableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
        </Box>
        </Box>
        </ThemeProvider>
        </Box>
  )
}

export default TeacherGradeBook
