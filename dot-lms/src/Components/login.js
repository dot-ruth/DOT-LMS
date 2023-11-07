/* eslint-disable eqeqeq */
/* eslint-disable react/no-direct-mutation-state */
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

function Login(){
    const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [formData,setFormData] = useState({
    user_id:"",
    password:""
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

  const onLoginhandler = () =>{
    
    axios.post("http://127.0.0.1:8000/api/Login",{
      user_id:formData.user_id,
      password:formData.password
    })
    .then((response)=>{
      console.log(response)
      if(response.data.success){
        sessionStorage.setItem("isLoggedIn",true);
        sessionStorage.setItem("First_Name",JSON.stringify(response.data.data[0]['first_name']))
        sessionStorage.setItem("Last_Name",JSON.stringify(response.data.data[0]['last_name']))
        sessionStorage.setItem("Department",JSON.stringify(response.data.data[0]['department']))
        
        sessionStorage.setItem("role",JSON.stringify(response.data.role));
if(response.data.role === "student"){
  sessionStorage.setItem("id",JSON.stringify(response.data.data[0]['student_id']))
}

if(response.data.role === "teacher"){
  sessionStorage.setItem("id",JSON.stringify(response.data.data[0]['teacher_id']))
}
        
        sessionStorage.setItem("token",JSON.stringify(response.data.token));
        
      }else{
        console.log('excuted else for response')
      }
      


      
      if(response.data.status === "failed" && response.data.success === undefined){

        seterrMsgUser(response.data.validation_error.user_id)
        seterrMsgPwd(response.data.validation_error.password)
        setTimeout(()=>{
          seterrMsgUser("")
          seterrMsgPwd("")
        },3000);
      }else if (response.data.status === "failed" &&
      response.data.success === false)
      {
        seterrMsg(response.data.message)

        setTimeout(() => {
          seterrMsg(" ")
        }, 3000);
      }

      const role = JSON.stringify(response.data.role);
      const token = JSON.stringify(response.data.token);

    const teacher = '"teacher"'
    const student = '"student"'
    const admin = '"admin"'
  if(token !== null){
    if(role === student){
      navigate("/Student_Dashboard")
    }else if(role === teacher){
      navigate("/Teacher_Dashboard")
    }else if(role === admin){
      navigate("/Admin_Dashboard")
    }
  }else{
    navigate('/')
  }

  window.location.reload(true)
    })
    
  }

  


  



return(
    <div >
      
<ThemeProvider theme={theme}>
<form>
        <div className="d-flex flex-column justify-content-center align-items-center mx-auto">
            <AppBar position="static" sx={{height:'5ch',mb: 10}}>
                <Typography sx={{ml:5,fontSize:25,fontWeight:'bold'}}>DOT</Typography>
                </AppBar>
            
<Typography sx={{m:2,fontSize:30,fontWeight:'bold'}}>Welcome to DOT Learning Management System</Typography>
<Typography sx={{m:2,fontSize:30,fontWeight:'bold'}}>Login</Typography>



<FormControl sx={{ m:2, width:'50ch'}} >
    <InputLabel color="primary">User ID</InputLabel>
    <OutlinedInput 
    type="text" 
    name="user_id" 
    color="primary" 
    label="User ID" 
    variant="outlined"
    value = {formData.user_id}
     onChange={onChangehandler}/>
     {errMsgUser && <div color="red"> {errMsgUser} </div>}
    
</FormControl>
<FormControl sx={{ m:2, width: '50ch' }} variant="outlined">
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
            value={formData.password}
            onChange={onChangehandler}
          />
          {errMsgPwd && <div color="red"> {errMsgPwd} </div>}
          
        </FormControl>
        {errMsg && <div color="red"> {errMsg} </div>}

        <Button color="primary" variant="contained" sx={{m:1, width:'20ch'}} onClick={onLoginhandler} >Login</Button>

        <Link to="/ForgotPassword" >Forgot Password ?</Link>
        
        </div>
        </form>
        </ThemeProvider>
        
    </div>
    
)
}

export default Login;