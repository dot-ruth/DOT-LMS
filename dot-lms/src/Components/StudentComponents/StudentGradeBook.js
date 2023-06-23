import { Box,TableContainer,ThemeProvider,Table,TableHead,TableBody,TableRow,TableCell,Paper } from "@mui/material"
import theme from "../theme";
import StudentSideDrawer from "./StudentSideDrawer";
import {Typography} from "@mui/material";

export default function StudentGradeBook(){
    function createData(Course,Attendance,Individual_Assignment,Group_Assignment,Mid_exam,Final_Exam,Total){
        return {Course,Attendance,Individual_Assignment,Group_Assignment,Mid_exam,Final_Exam,Total};
    }

    const rows = [
        createData('Web Dev',5,8,8,21,43.5,85.5)
    ]

    return (
        <Box>
            <ThemeProvider theme={theme}>
        <StudentSideDrawer/> 
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
            <TableCell align="right">Total</TableCell>
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
              <TableCell align="right">{row.Total}</TableCell>
              
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
