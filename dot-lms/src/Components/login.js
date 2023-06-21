/* eslint-disable react/no-direct-mutation-state */
import React, { useState } from "react";
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
import {Form, Link, redirect} from "react-router-dom";
import axios from "axios";

function Login(){
    const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [formData,setFormData] = useState({
    user_id:"",
    password:""
  })


  let onChangehandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let data = {};
    data[name] = value;
    setFormData((prevFormData)=>({...prevFormData,[name]:value}))

    //this.setState(data);
    }

  let onLoginhandler = () =>{
    axios.post("http://127.0.0.1:8000/api/login",{
      user_id:formData.user_id,
      password:formData.password
    })
    .then((response)=>{
      if(response.data.success){
        localStorage.setItem("isLoggedIn",true);
        localStorage.setItem("role",JSON.stringify(response.data.role));
        
      }
      console.log(response.data)
      // if(response.data.status === "failed" && response.data.success === undefined){
      //   this.setState({
      //     errMsgUser:response.data.validation_error.user_id,
      //     errMsgPwd:response.data.validation_error.password
      //   })
      //   setTimeout(()=>{
      //     this.setState({errMsgUser:"",errMsgPwd:""});
      //   },2000);
      // }else if (response.data.status === "failed" &&
      // response.data.success === false)
      // {
      //   this.setState({
      //     errMsg: response.data.message,
      //   });
      //   setTimeout(() => {
      //     this.setState({ errMsg: "" });
      //   }, 2000);
      // }
      const role = localStorage.getItem("role");
  
    if(role === "student"){
      //redirect("/Student_dashboard")
      console.log("stud")
    }else if(role === "teacher"){
      //redirect("/teacher_dashboard")
      console.log("tech")
    }else if(role === "admin"){
      //redirect("/admin_dashboard")
      console.log("admi")
    }else{
      console.log(role.toString() === 'teacher')
    }
    })
    
  }

return(
    <div >
<ThemeProvider theme={theme}>
<form method="POST" action="">
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
          
        </FormControl>

        <Button color="primary" variant="contained" type="Submit" sx={{m:1, width:'20ch'}} onSubmit={onLoginhandler} >Login</Button>
        
        </div>
        </form>
        </ThemeProvider>
        
    </div>
    
)
}

export default Login;