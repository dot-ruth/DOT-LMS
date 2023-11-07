import { Box,TableContainer,ThemeProvider,Table,TableHead,TableBody,TableRow,TableCell,Paper } from "@mui/material"
import theme from "../theme";
import StudentSideDrawer from "./StudentSideDrawer";
import {Typography} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

export default function StudentGradeBook(){
  const student_id = sessionStorage.getItem('id').replaceAll('"','')
    function createData(Course,Attendance,Individual_Assignment,Group_Assignment,Mid_exam,Final_Exam){
        return {Course,Attendance,Individual_Assignment,Group_Assignment,Mid_exam,Final_Exam};
    }

    const [rows,setrows] = useState([])

    let grade_rows =[]


    const getGrade = (Student_id) => {
      axios.get("http://127.0.0.1:8000/api/Grade/"+Student_id)
      .then((response)=>{
         grade_rows = [
          createData(
            response.data.course_id,
            response.data.attendance,
            response.data.individual_assignment,
            response.data.group_assignment,
            response.data.mid_exam,
            response.data.final_exam
  
            )
      ]

      setrows(grade_rows)
        
      })
    }


    return (
        <Box>
            <ThemeProvider theme={theme}>
        <StudentSideDrawer/> 
        {
      React.useEffect(()=>{
getGrade(student_id)
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])
}
        <Box 
        sx={{ml: `calc(${theme.spacing(7)} + 15px)`,
        display:'flex', 
        justifyContent:'space-between',
        height:'100vh',
        overflowY:'hidden',
        }}>
            <Box>
            <Typography variant="h5" 
        sx={{
            fontWeight:'bold',
            m:1
        }}
        >My Grade Book</Typography>

        <TableContainer component={Paper} sx={{ mx:'auto' }}>
            <Table>
            <TableHead>
          <TableRow>
            <TableCell align="center">Course</TableCell>
            <TableCell align="right">Attendance</TableCell>
            <TableCell align="right">Individual Assignment</TableCell>
            <TableCell align="right">Group Assignment</TableCell>
            <TableCell align="right">Mid Exam</TableCell>
            <TableCell align="right">Final Exam</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.Course}</TableCell>
              <TableCell align="right">{row.Attendance}</TableCell>
              <TableCell align="right">{row.Individual_Assignment}</TableCell>
              <TableCell align="right">{row.Group_Assignment}</TableCell>
              <TableCell align="right">{row.Mid_exam}</TableCell>
              <TableCell align="right">{row.Final_Exam}</TableCell>
              
            </TableRow>
          ))}
        </TableBody> 
            </Table>

        </TableContainer>
        </Box>
        </Box>
        </ThemeProvider>
        </Box>
        
    )
}
