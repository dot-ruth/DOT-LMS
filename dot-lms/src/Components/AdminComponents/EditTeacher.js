import React from 'react'
import { Box } from '@mui/material'
import {ThemeProvider }from '@mui/material'
import theme from '../theme'
import { useState } from 'react'
import {Typography} from '@mui/material'
import {FormControl,OutlinedInput,Button} from '@mui/material'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css'
import {  toast } from 'react-toastify'
import {InputLabel} from '@mui/material'
import PerfectScrollbar from 'react-perfect-scrollbar'

export default function EditTeacher(data) {
  const [formData,setFormData] = useState({
    user_id:data.data.teacher_id,
    first_name:data.data.First_Name,
    last_name:data.data.Last_Name,
    email:data.data.Email,
    department:data.data.department,
  })

  let onChangehandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let data = {};
    data[name] = value;
    setFormData((prevFormData)=>({...prevFormData,[name]:value}))
    }

    const onUpdatehandler =  () => {
        axios.put("http://127.0.0.1:8000/api/Teacher/" + data.data.teacher_id,{
            first_name:formData.first_name,
            last_name:formData.last_name,
            email:formData.email,
            department:formData.department,
          },
          toast.info('Updating,please wait a moment...',{
            position:toast.POSITION.BOTTOM_CENTER
          })
          ).then((response)=>{
            console.log(response)
            if(response.status === 200){
            toast.success('User updated Successfully',{
              position:toast.POSITION.BOTTOM_CENTER
            })
            window.location.reload(true)
          }else{
            toast.error('Error While updating the user, Please try again',{
              position:toast.POSITION.BOTTOM_CENTER
            })
          }
          })
      }
return (
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
       <Typography sx={{m:2,fontSize:30,fontWeight:'bold'}}>Update Teacher Form</Typography>
       

       <FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">User ID</InputLabel>
<OutlinedInput 
type="text" 
name="user_id" 
label='User ID'
color="primary" 
required={true}
variant="outlined"
value = {formData.user_id}
 onChange={onChangehandler}/>

</FormControl>

<FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">First Name</InputLabel>
<OutlinedInput 
type="text" 
name="first_name" 
label='First Name'
color="primary" 
required={true}
variant="outlined"
value = {formData.first_name}
 onChange={onChangehandler}/>

</FormControl>

<FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">Last Name</InputLabel>
<OutlinedInput 
type="text" 
name="last_name" 
color="primary" 
label='Last Name'
required={true}
variant="outlined"
value = {formData.last_name}
 onChange={onChangehandler}/>

</FormControl>

<FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">Email</InputLabel>
<OutlinedInput 
type="text" 
name="email" 
color="primary" 
label='Email'
required={true}
variant="outlined"
value = {formData.email}
 onChange={onChangehandler}/>

</FormControl>

<FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">Department</InputLabel>
<OutlinedInput 
type="text" 
name="department" 
color="primary" 
label='Department'
required={true}
variant="outlined"
value = {formData.department}
 onChange={onChangehandler}/>

</FormControl>



    <Button color="primary" variant="contained" sx={{m:1, width:'20ch'}} onClick={onUpdatehandler} >Update</Button>
   
    
    </div>
    </form>
    </Box>
    
    </Box>
    </ThemeProvider>
    </Box>
    </PerfectScrollbar>
)
}







