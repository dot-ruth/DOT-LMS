/* eslint-disable eqeqeq */
/* eslint-disable react/no-direct-mutation-state */
import React, {  useState } from "react";
import theme from "./theme";
import {Button, Typography} from "@mui/material";
import  {ThemeProvider} from "@mui/material";
import {FormControl} from "@mui/material";
import {InputLabel} from "@mui/material";
import {OutlinedInput} from "@mui/material";
import {AppBar} from "@mui/material";
import { ToastContainer, toast } from 'react-toastify'
import axios from "axios";

export default function ForgotPassword() {

    const [formData,setFormData] = useState({
        user_id:"",
      })
    
      let onChangehandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        setFormData((prevFormData)=>({...prevFormData,[name]:value}))
    
        //this.setState(data);
        }

        const getCode_handler = () =>{
            axios.post("http://127.0.0.1:8000/api/forgotPassword",{
              user_id:formData.user_id,
            })
            .then((response)=>{
              console.log(response)
              if(response.status == 200 ){
                toast.success('Please Check your Email',{
                    position:toast.POSITION.BOTTOM_CENTER
                  })
              }else{
                toast.error('An Error occured, Please try again',{
                    position:toast.POSITION.BOTTOM_CENTER
                  })
              }
              
                // seterrMsgUser(response.data.validation_error.user_id)
                // seterrMsgPwd(response.data.validation_error.password)
                // setTimeout(()=>{
                //   seterrMsgUser("")
                //   seterrMsgPwd("")
                // },3000);
              
                // seterrMsg(response.data.message)
                // setTimeout(() => {
                //   seterrMsg(" ")
                // }, 3000);
              
            })
            
          }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <ToastContainer/>
<form>
        <div className="d-flex flex-column justify-content-center align-items-center mx-auto">
            <AppBar position="static" sx={{height:'5ch',mb: 10}}>
                <Typography sx={{ml:5,fontSize:25,fontWeight:'bold'}}>DOT</Typography>
                </AppBar>
            
<Typography sx={{m:2,fontSize:30,fontWeight:'bold'}}>Forgot Password ?</Typography>




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

        <Button color="primary" variant="contained" sx={{m:1, width:'50ch'}} onClick={getCode_handler} >Get Verification code</Button>

        </div>
        </form>
        </ThemeProvider>
    </div>
  )
}

