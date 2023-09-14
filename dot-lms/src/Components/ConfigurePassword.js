import React, {  useState } from "react";
import theme from "./theme";
import {Button, Typography} from "@mui/material";
import  {ThemeProvider} from "@mui/material";
import {FormControl} from "@mui/material";
import {InputLabel} from "@mui/material";
import {OutlinedInput} from "@mui/material";
import {InputAdornment} from "@mui/material";
import {IconButton} from "@mui/material";
import {AppBar} from "@mui/material";
import {Visibility} from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


export default function ConfigurePassword() {

    const [showPassword, setShowPassword] = React.useState(false);

    const [showConfirmPassword,setshowConfirmPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClickShowPassword_confirm = () => setshowConfirmPassword((show) => !show)
  
    const [formData,setFormData] = useState({
      user_id:"",
      password:"",
      ConfirmPassword:"",
      otp:""
    })

    const [errMsgUser,seterrMsgUser] = useState("")
  const [errMsgPwd,seterrMsgPwd] = useState("")
  const [errconfpwd,seterrconfpwd] = useState("")
  const [errMsg,seterrMsg] = useState("")

  const navigate = useNavigate();


  let onChangehandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let data = {};
    data[name] = value;
    setFormData((prevFormData)=>({...prevFormData,[name]:value}))
    }

    
    const onConfigurehandler =  () =>{
        if(formData.ConfirmPassword === formData.password){
        axios.post("http://127.0.0.1:8000/api/ConfigurePassword",{
          user_id:formData.user_id,
          password:formData.password,
          otp:formData.otp
        })
        .then((response)=>{
          console.log(response)
        sessionStorage.setItem("isLoggedIn",true);
        sessionStorage.setItem("First_Name",JSON.stringify(response.data.data[0]['first_name']))
        sessionStorage.setItem("Last_Name",JSON.stringify(response.data.data[0]['last_name']))
        sessionStorage.setItem("Department",JSON.stringify(response.data.data[0]['department']))
        sessionStorage.setItem("teacher_id",JSON.stringify(response.data.data[0]['teacher_id']))
        sessionStorage.setItem("role",JSON.stringify(response.data.role));
        sessionStorage.setItem("token",JSON.stringify(response.data.token));

          const role = JSON.stringify(response.data.role);
          console.log(role)
    
        const teacher = '"teacher"'
        const student = '"student"'
        const admin = '"admin"'
      
        if(role === student){
          navigate("/Student_Dashboard")
          window.location.reload(true)
        }else if(role === teacher){
          navigate("/Teacher_Dashboard")
          window.location.reload(true)
        }else if(role === admin){
          navigate("/Admin_Dashboard")
          window.location.reload(true)
        }
        })
        
      }else{
        seterrconfpwd("Entry for Password and Confirm Password does not match")
      }

      
      
    }

    

  return (
    <div >
      
<ThemeProvider theme={theme}>
<form>
        <div className="d-flex flex-column justify-content-center align-items-center mx-auto">
            <AppBar position="static" sx={{height:'5ch',mb: 3}}>
                <Typography sx={{ml:5,fontSize:25,fontWeight:'bold'}}>DOT</Typography>
                </AppBar>
            
<Typography sx={{m:2,fontSize:20,fontWeight:'bold'}}>Password Configuration for the DOT Learning Management System</Typography>
<Typography sx={{m:2,fontSize:20,fontWeight:'bold'}}>Configure Password</Typography>



<FormControl sx={{ m:1, width:'50ch'}} >
    <InputLabel color="primary">User ID</InputLabel>
    <OutlinedInput 
    type="text" 
    name="user_id" 
    color="primary" 
    label="User ID" 
    variant="outlined"
    autoComplete="off"
    value = {formData.user_id}
     onChange={onChangehandler}/>
     {errMsgUser && <div color="red"> {errMsgUser} </div>}
    
</FormControl>

<FormControl sx={{ m:1, width:'50ch'}} >
    <InputLabel color="primary">Verification Code</InputLabel>
    <OutlinedInput 
    type="text" 
    name="otp" 
    color="primary" 
    label="Verification Code" 
    variant="outlined"
    autoComplete="off"
    value = {formData.otp}
     onChange={onChangehandler}/>
     {/* {errMsgUser && <div color="red"> {errMsgUser} </div>} */}
    
</FormControl>


<FormControl sx={{ m:1, width: '50ch' }} variant="outlined">
          <InputLabel color="primary" >Password</InputLabel>
          <OutlinedInput
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            color="primary"
            label="Password"
            name="password"
            autoComplete="off"
            value={formData.password}
            onChange={onChangehandler}
          />
         
          
        </FormControl>
       

        <FormControl sx={{ m:1, width: '50ch' }} variant="outlined">
          <InputLabel color="primary" >Confirm Password</InputLabel>
          <OutlinedInput
            type={showConfirmPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword_confirm}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            color="primary"
            label="Confirm Password"
            name="ConfirmPassword"
            autoComplete="off"
            value={formData.ConfirmPassword}
            onChange={onChangehandler}
          />
          {errMsgPwd && <div color="red"> {errconfpwd} </div>}
          
        </FormControl>

        <Button color="primary" variant="contained" sx={{m:1, width:'20ch'}} onClick={onConfigurehandler} >Done</Button>
        
        
        </div>
        </form>

        </ThemeProvider>
        
    </div>
  )
}


