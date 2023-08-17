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

    function create_teacher_name_array(First_Name,Last_Name){
        return {First_Name,Last_Name}
    }

    let teachernamearray = []

    const [teacher_rows,setteacher_rows] = React.useState([])

    const [course_array,setcourse_array] = React.useState([])

    const [teacher_id,setteacher_id] = React.useState()

    function getAssignedCourses(teacher_id) {

      axios.get("http://127.0.0.1:8000/api/Teacher/AssignedCourse/"+teacher_id)
      .then((response)=>{
        setcourse_array(response.data.AssignedCourses)
      })
      return course_array
    }

    const getTeacherData = () => {
        axios.get("http://127.0.0.1:8000/api/Teacher")
        .then((response)=>{
            for(let i = 0;i<response.data.teachers.length;i++){
                teachernamearray.push(create_teacher_name_array(response.data.teachers[i]['first_name'],response.data.teachers[i]['last_name']))
               getAssignedCourses(response.data.teachers[i]['teacher_id'])
                console.log(course_array)
            }
            setteacher_rows(teachernamearray)
            
        })

        
        
      

    }

  //   React.useEffect(() => {
  //   // Fetch the courses from the API.
  //   fetch('/api/courses')
  //     .then(response => response.json())
  //     .then(courses => setCourses(courses));
  // }, [])

    
  return (
    

    <Box>
            <ThemeProvider theme={theme}>
            {
            React.useEffect(()=>{
      getTeacherData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
      }
      
      {/* {
            React.useEffect(()=>{
      getAssignedCourses()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
      } */}
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
          alignItems:'center'
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
        <TableBody>
          {teacher_rows.map((row,i) => 
          (
            
            <StyledTableRow key={i}>
              <StyledTableCell >{row.First_Name} {row.Last_Name}</StyledTableCell>
              {course_array.map((course,index)=>(
                <Box sx={{
                  display:'flex',
                  flexDirection:'column'
                }}>
                <StyledTableCell>{course} <DeleteIcon color='primary' sx={{marginLeft:10}}/> 
                </StyledTableCell>
                </Box>
              ))}
              
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
      </Table>
    </TableContainer>
    </Box>
        
        </Box>
        </ThemeProvider>
        </Box>
  )
}

