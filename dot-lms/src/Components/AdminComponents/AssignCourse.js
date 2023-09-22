import React from 'react'
import theme from "../theme";
import { Box, ThemeProvider } from "@mui/material";
import AdminSideDrawer from "./AdminSideDrawer";
import { CardActionArea,CardContent,Card } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AssignCourseteacher from './AssignCourseteacher';
import AssignCoursestudent from './AssignCoursestudent';
import {styled} from '@mui/material/styles';
import {Paper }from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { ToastContainer} from 'react-toastify';
import {TableCell,tableCellClasses,TableRow,TableContainer,Table,TableHead,TableBody} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

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
      color: theme.palette.common.white
    },
  }));

export default function AssignCourse() {

    const [open_assign_teacher,setopen_assign_teacher] = React.useState(false)

    const [open_assign_student,setopen_assign_student] = React.useState(false)

    const handleOpen_assign_teacher = () => setopen_assign_teacher(true)

    const handleClose_assign_teacher = () => setopen_assign_teacher(false)

    const handleOpen_assign_student = () =>setopen_assign_student(true)

    const handleClose_assign_student = () => setopen_assign_student(false)

    function create_teacher_name_array(First_Name,Last_Name,ID,Courses){
        return {First_Name,Last_Name,ID,Courses}
    }

    let teachernamearray = []

    const [teacher_rows,setteacher_rows] = React.useState([])

    const [loading,setloading] = React.useState(true)

    const getTeacherData =async () => {
      const teacherResponse = await axios.get("http://127.0.0.1:8000/api/Teacher")
      for (let i=0;i<teacherResponse.data.teachers.length;i++){
        const courseResponse = await axios.get("http://127.0.0.1:8000/api/Teacher/AssignedCourse/"+teacherResponse.data.teachers[i]['teacher_id'])
        teachernamearray.push(create_teacher_name_array(teacherResponse.data.teachers[i]['first_name'],teacherResponse.data.teachers[i]['last_name'],teacherResponse.data.teachers[i]['teacher_id'],courseResponse))
      }
      setteacher_rows(teachernamearray)

    }

  return (
    <Box>
      {
        React.useEffect(()=>{
getTeacherData()
  setloading(false)


        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])
      }
            <ThemeProvider theme={theme}>
            <ToastContainer/>
             
        <AdminSideDrawer/>
        <Box 
        sx={{ml: `calc(${theme.spacing(7)} + 15px)`,
        
        
        }}>
            <Box sx={{
                mt:1,
                display:'flex', 
        justifyContent:'space-between',
                }}>
            <Card style={{
        border:"2px solid #68cca9",
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'5px',
        marginLeft:'15px',
        width:600,
        height:200,
       }}>
        <CardActionArea onClick={handleOpen_assign_teacher}>
        <CardContent sx={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center',
        }} >

<AssignmentTurnedInIcon fontSize='large' style={{fontWeight:'bold',margin:5,fontSize:'70px',color:'#68cca9'}}/>
         
          <Typography variant='h6' style={{fontWeight:'bold',margin:5}}>Assign Course to a Teacher</Typography>
           
          
        </CardContent>
      </CardActionArea>
      </Card>

      <Modal
        open={open_assign_teacher}
        onClose={handleClose_assign_teacher}
      >
        <Box sx={style}>
          < AssignCourseteacher />
        </Box>
      </Modal>

      <Card style={{
        border:"2px solid #68cca9",
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'5px',
        marginLeft:'15px',
        width:600,
        height:200,
       }}>
        <CardActionArea onClick={handleOpen_assign_student}>
        <CardContent sx={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center'
        }} >

<AssignmentTurnedInIcon fontSize='large' style={{fontWeight:'bold',margin:5,fontSize:'70px',color:'#68cca9'}}/>
         
          <Typography variant='h6' style={{fontWeight:'bold',margin:5}}>Assign Course to a Student</Typography>
           
          
        </CardContent>
      </CardActionArea>
      </Card>

      <Modal
        open={open_assign_student}
        onClose={handleClose_assign_student}
      >
        <Box sx={style}>
          < AssignCoursestudent />
        </Box>
      </Modal>

      
        </Box>

<Box sx={{
    mt:3
}}>
        <Typography variant='h6' style={{ fontWeight:'bold'}}>Teacher Assignment List</Typography>
         
        <TableContainer component={Paper} style={{
          marginTop:'5px',
          height:'100vh'
          }}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell >Teacher's Name</StyledTableCell>
              <StyledTableCell >Assigned Courses</StyledTableCell>
            </TableRow>
          </TableHead>
          {console.log(teacher_rows)}
          {(loading && teacher_rows.length === 0)?
          <TableBody>
            <StyledTableRow>
<StyledTableCell>Loading....</StyledTableCell>
</StyledTableRow>
</TableBody>

          :
          <TableBody>
            {teacher_rows.map((row,rowIndex) => 
            (
              
              <StyledTableRow key={rowIndex}>
                <StyledTableCell >{row.First_Name} {row.Last_Name}</StyledTableCell>
                
                <StyledTableCell >
              
                {console.log(row.Courses.data.AssignedCourses)}

                { 
                (row.Courses.data.AssignedCourses.length > 0)?
                row.Courses.data.AssignedCourses.map((course,columnIndex)=>(
                  
                    <Box
                     sx={{
                      display:'flex',
                      flexDirection:'column'
                    }} key={columnIndex}>

<Box >
                  {course} <DeleteIcon color='primary' sx={{marginLeft:10}}/> 
                  </Box>
                      
                      
                  </Box>
                  
                  )):<Box>
                    undefined</Box>
                }
                
                  </StyledTableCell>
                
              </StyledTableRow>
            ))}
  {/* <Modal
          open={open_edit}
          onClose={handleClose_edit}
        >
          {open_edit?
          <Box sx={style}>
          < EditAssignment row={edit_row} />
        </Box>:
        <Box></Box>
        } 
        </Modal> */}
            
          </TableBody>
}
        </Table>
      </TableContainer> 
      
    </Box>
        
        </Box>
        </ThemeProvider>
        </Box>
  )
}

