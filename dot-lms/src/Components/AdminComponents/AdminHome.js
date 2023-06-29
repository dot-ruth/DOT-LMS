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
import {TableCell,tableCellClasses,TableRow,TableContainer,Table,TableHead,TableBody} from '@mui/material';


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
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white
  },
  // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0,
  // },
}));


export default function AdminHome() {

  function create_student_Data(First_Name, Last_Name,student_id, department) {
    return { First_Name, Last_Name,student_id, department};
  }

  function create_teacher_Data(First_Name, Last_Name,teacher_id, department) {
    return { First_Name, Last_Name,teacher_id, department};
  }

  const [student_rows,setstudent_rows] = React.useState([])

  let studentarray = []
  let teacherarray = []

  const [teacher_rows,setteacher_rows] = React.useState([])

  function getStudentData(){
  axios.get("http://127.0.0.1:8000/api/user/student")
    .then((response)=>{
      //console.log(response.data)
      for (let i = 0; i < response.data.length; i++) {

        // Array.from(student_rows).push(
        //   create_student_Data(response.data[i]['first_name'], response.data[i]['last_name'],response.data[i]['student_id'], response.data[i]['department'],)
        // )
        studentarray.push(create_student_Data(response.data[i]['first_name'], response.data[i]['last_name'],response.data[i]['student_id'], response.data[i]['department'],))
         
  }
  setstudent_rows(studentarray)
})
// Array.from(student_rows).map((row)=>{return console.log(row.First_Name)})

    console.log(typeof(student_rows))
console.log(student_rows)
    console.log("hello")
}

  function getTeacherData(){
    axios.get("http://127.0.0.1:8000/api/user/teacher")
    .then((response)=>{
      // console.log(response.data)
      for (let i = 0; i < response.data.length; i++) {

        teacherarray.push(create_teacher_Data(response.data[i]['First_Name'], response.data[i]['Last_Name'],  response.data[i]['Teacher_id'], response.data[i]['Department'],))
        

      }
      setteacher_rows(teacherarray)
    })
  }


    
  

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        height:'100vh',
        weidth:'100vw',
        overflowY:'scroll',
        overflowX:'hidden'

      }}
      >
    <Box sx={{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between'
    }}>
       <Card style={{
        width:280,
        height:280,
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
           <Typography variant='h6' style={{fontWeight:'bold',margin:5,fontSize:'40px'}}>0</Typography>
          
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
        width:280,
        height:280,
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
           Total Number of Departments
          </Typography>
           <Typography variant='h6' style={{fontWeight:'bold',margin:5,fontSize:'40px'}}>0</Typography>
          
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
        width:280,
        height:280,
       }}>
        <CardActionArea>
        <CardContent sx={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center'
        }} >
            
          <CastForEducationIcon fontSize='large' style={{fontWeight:'bold',margin:5,fontSize:'70px',color:'#68cca9'}}/>
          <Typography  variant="subtitle1" style={{margin:1}}>
           Total Number of Courses
          </Typography>
           <Typography variant='h6' style={{fontWeight:'bold',margin:5,fontSize:'40px'}}>0</Typography>
          
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
        width:280,
        height:280,
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
           <Typography variant='h6' style={{fontWeight:'bold',margin:5,fontSize:'40px'}}>0</Typography>
          
        </CardContent>
      </CardActionArea>
      </Card>

    </Box>
    <Box>
      <Box sx={{
        margin:'15px'
      }}>{
        React.useEffect(()=>{
getStudentData()
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])}
      <Typography variant='h6' style={{ fontWeight:'bold'}}>Student List</Typography>
      {student_rows ? 
      <TableContainer component={Paper} style={{marginTop:'5px'}}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >First Name</StyledTableCell>
            <StyledTableCell >Last Name</StyledTableCell>
            <StyledTableCell >Student ID</StyledTableCell>
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
              <StyledTableCell >{row.department}</StyledTableCell>
              <StyledTableCell><EditIcon color='primary'/>  <DeleteIcon color='primary'/></StyledTableCell>
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

{
        React.useEffect(()=>{
getTeacherData()
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])}

      <Typography variant='h6' style={{ fontWeight:'bold',marginTop:'15px'}}>Teacher List</Typography>
      {teacher_rows ? 
      <TableContainer component={Paper} style={{marginTop:'5px'}}>
      <Table sx={{ Width: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >First Name</StyledTableCell>
            <StyledTableCell >Last Name</StyledTableCell>
            <StyledTableCell >Teacher ID</StyledTableCell>
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
              <StyledTableCell >{row.department}</StyledTableCell>
              <StyledTableCell><EditIcon color='primary'/>  <DeleteIcon color='primary'/></StyledTableCell>
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
  );
}
