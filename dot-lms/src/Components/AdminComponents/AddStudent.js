import React from 'react'
import { Box } from '@mui/material'
import {ThemeProvider }from '@mui/material'
import AdminSideDrawer from './AdminSideDrawer'
import theme from '../theme'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Typography} from '@mui/material'
import {FormControl,InputLabel,OutlinedInput,InputAdornment,IconButton,Button} from '@mui/material'
import { Visibility,VisibilityOff } from '@mui/icons-material'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { ToastContainer, toast } from 'react-toastify'

function AddStudent() {

    const [showPassword, setShowPassword] = React.useState(false);
    
  const handleClickShowPassword = () => setShowPassword((show) => !show);

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

  const [errMsgUser,seterrMsgUser] = useState("")
  const [errMsgPwd,seterrMsgPwd] = useState("")
  const [errMsg,seterrMsg] = useState("")


  const navigate = useNavigate();

  let onChangehandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let data = {};
    data[name] = value;
    setFormData((prevFormData)=>({...prevFormData,[name]:value}))

    //this.setState(data);
    }

    let onCreatehandler = () =>{
      if(formData.password === formData.confirm_password){
        axios.post("http://127.0.0.1:8000/api/user/student",{
          first_name:formData.first_name,
          last_name:formData.last_name,
          email:formData.email,
          department:formData.department,
          year:formData.year,
          semester:formData.semester,
          password:formData.password,
          mode:'cors'
        })
        .then((response)=>{
          console.log(response)
          toast.success('User Created Successfully',{
            position:toast.POSITION.BOTTOM_CENTER
          })
          
          // if(response.data.success){
          //   sessionStorage.setItem("isLoggedIn",true);
          //   sessionStorage.setItem("First_Name",JSON.stringify(response.data.data[0]['first_name']))
          //   sessionStorage.setItem("Last_Name",JSON.stringify(response.data.data[0]['last_name']))
          //   sessionStorage.setItem("Department",JSON.stringify(response.data.data[0]['department']))
          //   sessionStorage.setItem("role",JSON.stringify(response.data.role));
          // }else{
          //   console.log('excuted else for response')
          // }
          // const role = JSON.stringify(response.data.role);
          // console.log(role)
    
          
        //   if(response.data.status === "failed" && response.data.success === undefined){
    
        //     seterrMsgUser(response.data.validation_error.user_id)
        //     seterrMsgPwd(response.data.validation_error.password)
        //     setTimeout(()=>{
        //       seterrMsgUser("")
        //       seterrMsgPwd("")
        //     },3000);
        //   }else if (response.data.status === "failed" &&
        //   response.data.success === false)
        //   {
        //     seterrMsg(response.data.message)
    
        //     setTimeout(() => {
        //       seterrMsg(" ")
        //     }, 3000);
        //   }
    
        // const teacher = '"teacher"'
        // const student = '"student"'
        // const admin = '"admin"'
      
        // if(role === student){
        //   navigate("/Student_Dashboard")
        // }else if(role === teacher){
        //   navigate("/Teacher_Dashboard")
        // }else if(role === admin){
        //   navigate("/Admin_Dashboard")
        // }
        })
      }else{
        console.log('excuted the else statement for confirm password if')
        toast.error('Confirm Password does not match with password',{
          position:toast.POSITION.BOTTOM_CENTER
        })
      }
        
      }

  return (
    
        <Box
        sx={{
            height:'100vh',
            weidth:'100vw',
          }}
        >
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
    color="primary" 
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
    variant="outlined"
    value = {formData.semester}
     onChange={onChangehandler}/>
     {/* {errMsgUser && <div color="red"> {errMsgUser} </div>} */}
    
</FormControl>

<FormControl sx={{ m:2, width: '50ch' }} variant="outlined">
          <InputLabel color="primary" >Password</InputLabel>
          <OutlinedInput
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            color="primary"
            name="password"
            value={formData.password}
            onChange={onChangehandler}
          />
          {/* {errMsgPwd && <div color="red"> {errMsgPwd} </div>} */}
          
        </FormControl>

        <FormControl sx={{ m:2, width: '50ch' }} variant="outlined">
          <InputLabel color="primary" >Confirm Password</InputLabel>
          <OutlinedInput
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            color="primary"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={onChangehandler}
          />
          {/* {errMsgPwd && <div color="red"> {errMsgPwd} </div>} */}
          
        </FormControl>
        {/* {errMsg && <div color="red"> {errMsg} </div>} */}

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

  




