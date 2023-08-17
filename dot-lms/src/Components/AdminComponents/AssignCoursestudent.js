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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
      children: PropTypes.node,
      index: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
    };
    
    function a11yProps(index) {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }

export default function AssignCoursestudent() {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [formData,setFormData] = useState({
    student_id:"",
    course_id:"",
    entry_year:"",
    department:""
  })

  let onChangehandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let data = {};
    data[name] = value;
    setFormData((prevFormData)=>({...prevFormData,[name]:value}))
    }

    const onAssignhandler = () =>{
        axios.post("http://127.0.0.1:8000/api/Student/Assign_courses",{
            student_id:formData.student_id,
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

    const onAssignBatchhandler = () =>{
      axios.post("http://127.0.0.1:8000/api/Student/AssignbyBatch",{
          entry_year:formData.entry_year,
          course_id:formData.course_id,
          department:formData.department,
          
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
      <ThemeProvider theme={theme}>
    <PerfectScrollbar>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Assign Course to a Student" {...a11yProps(0)} />
          <Tab label="Assign Course by Batch" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <Box>
      <Box 
      sx={{
      display:'flex', 
      justifyContent:'center',
      alignItems:'center',
      }}>
          <Box sx={{mt:1}}>
          <form>
      <div className="d-flex flex-column justify-content-center align-items-center mx-auto">
         <Typography sx={{m:2,fontSize:30,fontWeight:'bold'}}>Assign Course to a Student</Typography>
         

<FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">Student ID</InputLabel>
  <OutlinedInput 
  type="text" 
  name="student_id" 
  label='Student ID'
  color="primary" 
  required={true}
  variant="outlined"
  value={formData.student_id}
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
     
      </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <Box 
      sx={{
      display:'flex', 
      justifyContent:'center',
      alignItems:'center',
      }}>
          <Box sx={{mt:1}}>
          <form>
      <div className="d-flex flex-column justify-content-center align-items-center mx-auto">
         <Typography sx={{m:2,fontSize:30,fontWeight:'bold'}}>Assign Course by Batch</Typography>
         

<FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">Entry Year</InputLabel>
  <OutlinedInput 
  type="text" 
  name="entry_year" 
  label='Entry Year'
  color="primary" 
  required={true}
  variant="outlined"
  value={formData.entry_year}
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

<FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">Department</InputLabel>
  <OutlinedInput 
  type="text" 
  name="department" 
  label='Department'
  color="primary" 
  required={true}
  variant="outlined"
  value={formData.department}
  onChange={onChangehandler}/>
  
</FormControl>


      <Box sx={{display:'flex'}}>
      <Button color="primary" variant="contained" sx={{m:1, width:'20ch'}} onClick={onAssignBatchhandler} >Assign Course</Button>
      </Box>
      </div>
      </form>
      </Box>
      
      </Box>
      </CustomTabPanel>
  
      </PerfectScrollbar>
      </ThemeProvider>
  </div>
  )
}




// import * as React from 'react';
// 
// 
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

// 

// 

// export default function BasicTabs() {
//   

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//           <Tab label="Item One" {...a11yProps(0)} />
//           <Tab label="Item Two" {...a11yProps(1)} />
//           <Tab label="Item Three" {...a11yProps(2)} />
//         </Tabs>
//       </Box>
      
//       <CustomTabPanel value={value} index={2}>
//         Item Three
//       </CustomTabPanel>
//     </Box>
//   );
// }





