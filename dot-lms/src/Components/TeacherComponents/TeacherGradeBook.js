import React, { useState } from 'react'
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
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'

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
  const teacher_id = sessionStorage.getItem('id').replaceAll('"','')
  const [Course_data_Array,setCourse_data_Array] = React.useState([])
  const [Student_data_Array,setStudent_data_Array] = React.useState([])
  const [attendance,setAttendance] = React.useState([])
  const [course_id,setcourse_id] = React.useState([])
  const [finalExam,setfinalExam] = React.useState([])
  const [gradeID,setgradeID] = React.useState([])
  const [groupAssignment,setgroupAssignment] = React.useState([])
  const [individualAssignment,setindividualAssignment] = React.useState([])
  const [midExam,setmidExam] = React.useState([])
  const [disabled, setDisabled] = useState(true);


  let CourseArray = []
  let StudentArray = []

  

  let onChangehandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let data = {};
    data[name] = value;
    setFormData((prevFormData)=>({...prevFormData,[name]:value}))
    }

   async function getAssignedCourse  (Teacher_id) {
  const CourseResponse = await axios.get("http://127.0.0.1:8000/api/Teacher/AssignedCourse/" + Teacher_id)
    
      let Course
      
      for(let i=0;i<CourseResponse.data.Course_Data.length;i++){
        
        Course = {
          key:CourseResponse.data.Course_Data[i]['course_id'],
          value:CourseResponse.data.AssignedCourses[i]
        }
        CourseArray.push(Course)
        
      }
      return CourseArray
      
      }

      const getStudentlist_Course = (Course_id) => {
        let Student
        axios.get("http://127.0.0.1:8000/api/Student/Course/" + Course_id)
        .then((response)=>{

          for(let i=0;i<response.data.length;i++){
            Student = {
              key:response.data[i]['student_id'],
              value:response.data[i]['first_name'] + " " + response.data[i]['last_name']
            }
            StudentArray.push(Student)
          }
          setStudent_data_Array(StudentArray)
          console.log(Student_data_Array)
        })
      }

      const getGrade = (Student_id) => {
        axios.get("http://127.0.0.1:8000/api/Grade/"+Student_id)
        .then((response)=>{
setAttendance(response.data.attendance)
setcourse_id(response.data.course_id)
setfinalExam(response.data.final_exam)
setgradeID(response.data.grade_id)
setgroupAssignment(response.data.group_assignment)
setindividualAssignment(response.data.individual_assignment)
setmidExam(response.data.mid_exam)
        })
      }

      const [formData,setFormData] = useState({
    attendance:"",
    course_id:"",
    finalExam:"",
    gradeID:"",
    groupAssignment:"",
    individualAssignment:"",
    midExam:""
  })

      const setGrade = (course_id,student_id)=>{
        setDisabled(true)
      axios.post("http://127.0.0.1:8000/api/Grade",{
        course_id:course_id,
        attendance:attendance,
        individual_assignment:individualAssignment,
        group_assignment:groupAssignment,
        mid_exam:midExam,
        final_exam:finalExam,
        student_id:student_id,

        },
        toast.info('Adding Grade,please wait a moment...',{
          position:toast.POSITION.BOTTOM_CENTER
        })
        ).then((response)=>{
          console.log(response)
          if(response.data.success){
          toast.success('Grade Added Successfully',{
            position:toast.POSITION.BOTTOM_CENTER
          })
          
        }else{
          toast.error(response.data.error,{
            position:toast.POSITION.BOTTOM_CENTER
          })
        }
        })

    }

    const editGrade = (grade_id) => {
      setDisabled(false)
    }
  return (
    <Box>
      <ToastContainer/>
            <ThemeProvider theme={theme}>
            {
      React.useEffect(()=>{
        const CoursePromise = getAssignedCourse(teacher_id)
        CoursePromise.then((response=>{
          setCourse_data_Array(response)
        }))
        
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])
}
          <TeacherSideDrawer/> 
        <Box 
        sx={{ml: `calc(${theme.spacing(7)} + 15px)`,
        display:'flex', 
        justifyContent:'space-between',
        height:'100vh',
        overflowY:'hidden',
        }}>
            <Box sx={{mt:1}}>
            {Course_data_Array.map((Course)=>(
                  
                 <Button size="small" color="primary" variant="contained" sx={{ml:1}}
                 onClick={()=>getStudentlist_Course(Course['key'])}
                 >
                 {Course['value']}
               </Button>
                ))}
            
            <TableContainer component={Paper} style={{margin:'5px',width:1180}}>
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
        {Student_data_Array?
        <TableBody>

{Student_data_Array.map((Student)=>(
                  
                  <StyledTableRow >
                    {getGrade(Student['key'])}
          <StyledTableCell >{Student['value']}</StyledTableCell>
          <StyledTableCell ><TextField id="standard-basic"  variant="standard" value={attendance} onChange={onChangehandler}  disabled={disabled}/></StyledTableCell>
          <StyledTableCell ><TextField id="standard-basic"  variant="standard" value={individualAssignment} onChange={onChangehandler} disabled={disabled}/></StyledTableCell>
          <StyledTableCell ><TextField id="standard-basic"  variant="standard" value={groupAssignment} onChange={onChangehandler} disabled={disabled}/></StyledTableCell>
          <StyledTableCell ><TextField id="standard-basic"  variant="standard" value={midExam} onChange={onChangehandler} disabled={disabled}/></StyledTableCell>
          <StyledTableCell ><TextField id="standard-basic"  variant="standard" value={finalExam} onChange={onChangehandler} disabled={disabled}/></StyledTableCell>
          <StyledTableCell ><CheckIcon sx={{color:'#68cca9',mr:1}} onClick={()=>setGrade(course_id,Student['key'])}/> 
          <ModeEditIcon sx={{color:'#68cca9',mr:1}} onClick={()=>editGrade(gradeID)}/> </StyledTableCell>
        </StyledTableRow>
                 
                 ))}

        
      
    </TableBody>:
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
      }
        
      </Table>
    </TableContainer>
        </Box>
        </Box>
        </ThemeProvider>
        </Box>
  )
}

export default TeacherGradeBook
