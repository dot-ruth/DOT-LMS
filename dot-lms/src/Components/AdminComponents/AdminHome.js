import * as React from 'react';
import {  ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import theme from '../theme'
import { CardActionArea,CardContent,Card } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import BookIcon from '@mui/icons-material/Book';
import axios from "axios";
import {styled} from '@mui/material/styles';
import {Paper }from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ToastContainer, toast } from 'react-toastify'
import {Button} from '@mui/material';
import 'react-perfect-scrollbar/dist/css/styles.css'
import { Link } from 'react-router-dom';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Modal from '@mui/material/Modal';
import EditStudent from './EditStudent';
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

    // backgroundColor: theme.palette.secondary.main,

    color: theme.palette.common.white
  },
}));



export default function AdminHome() {

  function create_student_Data(First_Name, Last_Name,student_id,Email, department) {
    return { First_Name, Last_Name,student_id,Email, department};
  }

  function create_teacher_Data(First_Name, Last_Name,teacher_id, Email,department) {
    return { First_Name, Last_Name,teacher_id,Email, department};
  }

  const [student_rows,setstudent_rows] = React.useState([])

  const [student_count,setstudent_count] = React.useState()

  const [teacher_count,setteacher_count] = React.useState()

  const [course_count,setcourse_count] = React.useState()

  let studentarray = []
  let teacherarray = []

  const [teacher_rows,setteacher_rows] = React.useState([])

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);


  const getStudentData =()=>{
  axios.get("http://127.0.0.1:8000/api/Student")
    .then((response)=>{
      console.log(response.data.students)
      for (let i = 0; i < response.data.students.length; i++) {
        studentarray.push(create_student_Data(response.data.students[i]['first_name'], response.data.students[i]['last_name'],response.data.students[i]['student_id'],response.data.students[i]['email'], response.data.students[i]['department']))  
  }
  setstudent_rows(studentarray)
  setstudent_count(response.data.student_count)
})
}

  function getTeacherData(){
    axios.get("http://127.0.0.1:8000/api/Teacher")
    .then((response)=>{
      console.log(response.data.teachers)
      for (let i = 0; i < response.data.teachers.length; i++) {

        teacherarray.push(create_teacher_Data(response.data.teachers[i]['first_name'], response.data.teachers[i]['last_name'],  response.data.teachers[i]['teacher_id'],response.data.teachers[i]['email'],response.data.teachers[i]['department'],))
        

      }
      setteacher_rows(teacherarray)
      setteacher_count(response.data.teacher_count)
    })
  }

  function getCourseCount(){
    axios.get("http://127.0.0.1:8000/api/Course")
    .then((response)=>{
       setcourse_count(response.data.course_count)
    })
  }

  function delete_student(user_id){
     axios.delete("http://127.0.0.1:8000/api/Student/"+user_id)
     .then(()=>{
      toast.success('User deleted Successfully',{
        position:toast.POSITION.BOTTOM_CENTER
      })
      window.location.reload(true)
     })
  }

  function delete_teacher(user_id){
    axios.delete("http://127.0.0.1:8000/api/Teacher/"+user_id)
    .then(()=>{
     toast.success('User deleted Successfully',{
       position:toast.POSITION.BOTTOM_CENTER
     })
     window.location.reload(true)
    })
  }

  return (

    <PerfectScrollbar>
    <ThemeProvider theme={theme}>
<ToastContainer/>
    {
      React.useEffect(()=>{
getStudentData()
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])
}
{
React.useEffect(()=>{
  getTeacherData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
}

{
React.useEffect(()=>{
  getCourseCount()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
}

      <Box sx={{
        height:'100vh',
        weidth:'100vw',
      }}
      >
    <Box sx={{
      weidth:'100vw',
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between'
    }}>
       <Card style={{
        width:375,
        height:200,
        border:"2px solid #68cca9",
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'5px',
        marginLeft:'15px',
       }}>
        <CardActionArea>
        <CardContent sx={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center'
        }} >
            
          <PersonIcon fontSize='large' style={{fontWeight:'bold',margin:5,fontSize:'70px',color:'#68cca9'}}/>
          <Typography  variant="subtitle1" style={{margin:1}}>
           Total Number of Students
          </Typography>
           <Typography variant='h6' style={{fontWeight:'bold',margin:5,fontSize:'40px'}}>{student_count}</Typography>
          
        </CardContent>
      </CardActionArea>
      </Card>

     

      <Card style={{
        border:"2px solid #68cca9",
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'5px',
        marginLeft:'15px',
        width:375,
        height:200,
       }}>
        <CardActionArea>
        <CardContent sx={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center'
        }} >
            
          <BookIcon fontSize='large' style={{fontWeight:'bold',margin:5,fontSize:'70px',color:'#68cca9'}}/>
          <Typography  variant="subtitle1" style={{margin:1}}>
           Total Number of Courses
          </Typography>
           <Typography variant='h6' style={{fontWeight:'bold',margin:5,fontSize:'40px'}}>{course_count}</Typography>
          
        </CardContent>
      </CardActionArea>
      </Card>

      <Card style={{
        border:"2px solid #68cca9",
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'5px',
        marginLeft:'15px',
        width:375,
        height:200,
       }}>
        <CardActionArea>
        <CardContent sx={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center'
        }} >

<PersonIcon fontSize='large' style={{fontWeight:'bold',margin:5,fontSize:'70px',color:'#68cca9'}}/>
         <Typography  variant="subtitle1" style={{margin:1}}>
           Total Number of Teachers
          </Typography>
           <Typography variant='h6' style={{fontWeight:'bold',margin:5,fontSize:'40px'}}>{teacher_count}</Typography>
          
        </CardContent>
      </CardActionArea>
      </Card>

    </Box>
    <Box>
      <Box sx={{
        margin:'15px'
      }}>

      <Box sx={{
        display:'flex',
        justifyContent:'space-between'
      }}>
      <Typography variant='h6' style={{ fontWeight:'bold'}}>Student List</Typography>
      <Link to='/Add Student'>
      <Button variant='contained' style={{backgroundColor:'primary'}}>Add Student</Button>
      </Link>

      </Box>
      {student_rows ? 
      <TableContainer component={Paper} style={{marginTop:'5px'}}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >First Name</StyledTableCell>
            <StyledTableCell >Last Name</StyledTableCell>
            <StyledTableCell >Student ID</StyledTableCell>
            <StyledTableCell >Email</StyledTableCell>
            <StyledTableCell >Department</StyledTableCell>
            <StyledTableCell > </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {student_rows.map((row,i) => (
            <StyledTableRow key={i}>
              <StyledTableCell >{row.First_Name}</StyledTableCell>
              <StyledTableCell >{row.Last_Name}</StyledTableCell>
              <StyledTableCell >{row.student_id}</StyledTableCell>
              <StyledTableCell >{row.Email}</StyledTableCell>
              <StyledTableCell >{row.department}</StyledTableCell>
              <StyledTableCell><EditIcon color='primary' onClick={handleOpen}/>  <DeleteIcon color='primary' onClick={()=>delete_student(row.student_id)}/></StyledTableCell>
              <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          < EditStudent data={student_rows} />
        </Box>
      </Modal>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
       : 
       <TableContainer component={Paper} style={{marginTop:'5px'}}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >First Name</StyledTableCell>
            <StyledTableCell >Last Name</StyledTableCell>
            <StyledTableCell >Student ID</StyledTableCell>
            <StyledTableCell >Email</StyledTableCell>
            <StyledTableCell >Department</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        <StyledTableRow>
              <StyledTableCell >No Student Users</StyledTableCell>
            </StyledTableRow>
          
        </TableBody>
      </Table>
       </TableContainer>
}
      </Box>
      <Box>
        <Box sx={{
        marginTop:'5px',
        marginLeft:'15px'
      }}>
      <Box sx={{
        display:'flex',
        justifyContent:'space-between'
      }}>
      <Typography variant='h6' style={{ fontWeight:'bold'}}>Teacher List</Typography>
      <Link to='/Add_Teacher'>
      <Button variant='contained' style={{backgroundColor:'primary'}}>Add Teacher</Button>
      </Link>
      </Box>

      {teacher_rows ? 
      <TableContainer component={Paper} style={{marginTop:'5px'}}>
      <Table sx={{ Width: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >First Name</StyledTableCell>
            <StyledTableCell >Last Name</StyledTableCell>
            <StyledTableCell >Teacher ID</StyledTableCell>
            <StyledTableCell >Email</StyledTableCell>
            <StyledTableCell >Department</StyledTableCell>
            <StyledTableCell > </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teacher_rows.map((row,i) => (
            <StyledTableRow key={i}>
              <StyledTableCell >{row.First_Name}</StyledTableCell>
              <StyledTableCell >{row.Last_Name}</StyledTableCell>
              <StyledTableCell >{row.teacher_id}</StyledTableCell>
              <StyledTableCell >{row.Email}</StyledTableCell>
              <StyledTableCell >{row.department}</StyledTableCell>
              <StyledTableCell> <Link to='Edit_teacher'><EditIcon color='primary'/> </Link> <DeleteIcon color='primary' onClick={()=>delete_teacher(row.teacher_id)}/></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
       : 
       <TableContainer component={Paper} style={{marginTop:'5px'}}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >First Name</StyledTableCell>
            <StyledTableCell >Last Name</StyledTableCell>
            <StyledTableCell >TEacher ID </StyledTableCell>
            <StyledTableCell >Email</StyledTableCell>
            <StyledTableCell >Department</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        <StyledTableRow>
              <StyledTableCell >No Teacher Users</StyledTableCell>
            </StyledTableRow>
          
        </TableBody>
      </Table>
       </TableContainer>
}
      </Box>
      </Box>
    </Box>
    </Box>
    </ThemeProvider>
    </PerfectScrollbar>

  );
}
