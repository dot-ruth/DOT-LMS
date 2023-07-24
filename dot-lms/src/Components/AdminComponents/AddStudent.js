import React from 'react'
import {useEffect} from 'react'
import { Box } from '@mui/material'
import {ThemeProvider }from '@mui/material'
import AdminSideDrawer from './AdminSideDrawer'
import theme from '../theme'
import { useState } from 'react'
import {Typography} from '@mui/material'
import {FormControl,OutlinedInput,Button} from '@mui/material'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css'
import { ToastContainer, toast } from 'react-toastify'
import {InputLabel} from '@mui/material'

function AddStudent() {

  const [formData,setFormData] = useState({
    first_name:"",
    last_name:"",
    email:"",
    department:"",
    year:"",
    semester:"",
    password:"",
    confirm_password:"",
  })

  // const [errMsg_firstName,seterrMsg_first_Name] = useState("")
  // const [errMsg_lastName,seterrMsg_lastName] = useState("")
  // const [errMsg_email,seterrMsg_email] = useState("")
  // const [errMsg_department,seterrMsg_department] = useState("")
  // const [errMsg_year,seterrMsg_year] = useState("")
  // const [errMsg_semester,seterrMsg_semester] = useState("")

  let onChangehandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let data = {};
    data[name] = value;
    setFormData((prevFormData)=>({...prevFormData,[name]:value}))
    }

    

    const onCreatehandler =  () =>{
      axios.post("http://127.0.0.1:8000/api/Student",{
          first_name:formData.first_name,
          last_name:formData.last_name,
          email:formData.email,
          department:formData.department,
          year:formData.year,
          semester:formData.semester,
          mode:'cors'

        },
        toast.info('Registration is loading,please wait a moment...',{
          position:toast.POSITION.BOTTOM_CENTER
        })
        ).then((response)=>{
          console.log(response)
          if(response.data.success){
          toast.success('User registered Successfully',{
            position:toast.POSITION.BOTTOM_CENTER
          })
        }else{
          toast.error('Error While registering the user, Please try again',{
            position:toast.POSITION.BOTTOM_CENTER
          })
        }
        })
    }
  return (

    
    
        <Box
        sx={{
            height:'100vh',
            weidth:'100vw',
          }}>
          <ToastContainer/>
            <ThemeProvider theme={theme}>
        <AdminSideDrawer/>
        <Box 
        sx={{
        display:'flex', 
        justifyContent:'center',
        alignItems:'center',
        }}>
            <Box sx={{mt:1}}>
            <form>
        <div className="d-flex flex-column justify-content-center align-items-center mx-auto">
           <Typography sx={{m:2,fontSize:30,fontWeight:'bold'}}>Create Student From</Typography>



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
     {/* {errMsgUser && <div color="red"> {errMsgUser} </div>} */}
    
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
     {/* {errMsgUser && <div color="red"> {errMsgUser} </div>} */}
    
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
     {/* {errMsgUser && <div color="red"> {errMsgUser} </div>} */}
    
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
     {/* {errMsgUser && <div color="red"> {errMsgUser} </div>} */}
    
</FormControl>

<FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">Year</InputLabel>
    <OutlinedInput 
    type="number" 
    name="year" 
    color="primary" 
    label="Year"
    variant="outlined"
    value = {formData.year}
     onChange={onChangehandler}/>
     {/* {errMsgUser && <div color="red"> {errMsgUser} </div>} */}
    
</FormControl>

<FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">Semester</InputLabel>
    <OutlinedInput 
    type="number" 
    name="semester" 
    color="primary" 
    label="Semester"
    variant="outlined"
    value = {formData.semester}
     onChange={onChangehandler}/>
     {/* {errMsgUser && <div color="red"> {errMsgUser} </div>} */}
    
</FormControl>

        <Button color="primary" variant="contained" sx={{m:1, width:'20ch'}} onClick={onCreatehandler} >Create</Button>
        
        </div>
        </form>
        </Box>
        
        </Box>
        </ThemeProvider>
        </Box>
  )
}

export default AddStudent

  




