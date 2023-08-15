import React , {  useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box } from '@mui/material';
import {  toast } from 'react-toastify';
import {ThemeProvider }from '@mui/material';
import theme from '../theme';
import {Typography }from '@mui/material';
import {FormControl} from '@mui/material';
import {InputLabel} from '@mui/material';
import {OutlinedInput }from '@mui/material';
import {Button} from '@mui/material';
import axios from 'axios'

export default function AssignCourseteacher() {

  const [formData,setFormData] = useState({
    teacher_id:"",
    course_id:""
  })

  let onChangehandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let data = {};
    data[name] = value;
    setFormData((prevFormData)=>({...prevFormData,[name]:value}))
    }

    const onAssignhandler = () =>{
        axios.post("http://127.0.0.1:8000/api/Teacher/Assign_courses",{
            teacher_id:formData.teacher_id,
            course_id:formData.course_id
          },
          toast.info('Assigning Course...',{
            position:toast.POSITION.BOTTOM_CENTER
          })
          ).then((response)=>{
            console.log(response)
            if(response.status===200){
            toast.success('Course Assigned',{
              position:toast.POSITION.BOTTOM_CENTER
            })
            window.location.reload(true)
          }else{
            toast.error('Error While assigning Course, Please try again',{
              position:toast.POSITION.BOTTOM_CENTER
            })
          }
          })
    }

  return (
    <div>
    <PerfectScrollbar>
  <Box
      sx={{
          height:'100vh',
          weidth:'100vw',
        }}>
        
          <ThemeProvider theme={theme}>
      
      <Box 
      sx={{
      display:'flex', 
      justifyContent:'center',
      alignItems:'center',
      }}>
          <Box sx={{mt:1}}>
          <form>
      <div className="d-flex flex-column justify-content-center align-items-center mx-auto">
         <Typography sx={{m:2,fontSize:30,fontWeight:'bold'}}>Assign Course to a Teacher</Typography>
         

<FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">Teacher ID</InputLabel>
  <OutlinedInput 
  type="text" 
  name="teacher_id" 
  label='Teacher ID'
  color="primary" 
  required={true}
  variant="outlined"
  value={formData.teacher_id}
  onChange={onChangehandler}/>
  
</FormControl>

<FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">Course ID</InputLabel>
  <OutlinedInput 
  type="text" 
  name="course_id" 
  label='Course ID'
  color="primary" 
  required={true}
  variant="outlined"
  value={formData.course_id}
  onChange={onChangehandler}/>
  
</FormControl>


      <Box sx={{display:'flex'}}>
      <Button color="primary" variant="contained" sx={{m:1, width:'20ch'}} onClick={onAssignhandler} >Assign Course</Button>
      </Box>
      </div>
      </form>
      </Box>
      
      </Box>
      </ThemeProvider>
      </Box>
      </PerfectScrollbar>
  </div>
  )
}


