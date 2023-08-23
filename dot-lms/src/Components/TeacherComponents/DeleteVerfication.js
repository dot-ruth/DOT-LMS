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

export default function DeleteVerfication(delete_row) {

    const [teacherName,setteacherName] = useState("")

    const [formData,setFormData] = useState({
        user_id:"",
        password:"",
      })

      let onChangehandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        setFormData((prevFormData)=>({...prevFormData,[name]:value}))
        }

        function getTeacherName  (Teacher_id) {
            axios.get("http://127.0.0.1:8000/api/Teacher/" + Teacher_id)
            .then((response)=>{
                setteacherName(response.data.first_name)
            })
            
              }

              const onDeletehandler =  () =>{
                axios.post("http://127.0.0.1:8000/api/Login",{
      user_id:formData.user_id,
      password:formData.password
    })
    .then((response)=>{
        if(response.status === 200){
            axios.delete("http://127.0.0.1:8000/api/Mockexams/"+delete_row.row.exam_id ,
            toast.info('Deleting Exam,please wait a moment...',{
              position:toast.POSITION.BOTTOM_CENTER
            })
            ).then((response)=>{
              console.log(response)
              if(response.status === 200){
              toast.success('Exam deleted Successfully',{
                position:toast.POSITION.BOTTOM_CENTER
              })
              window.location.reload(true)
            }else{
              toast.error('Error While deleting the exam, Please try again',{
                position:toast.POSITION.BOTTOM_CENTER
              })
            }
            })
        }else{
            toast.error('hmmm....Failed to verify your identity ' ,{
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

{
      React.useEffect(()=>{
getTeacherName(delete_row.row.teacher_id)
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])
}
          
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
           <Typography sx={{m:2,fontSize:30,fontWeight:'bold'}}>Please Verify that you're {teacherName}</Typography>
           

           <FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">User ID</InputLabel>
    <OutlinedInput 
    type="text" 
    name="user_id" 
    label='user ID'
    color="primary" 
    required={true}
    variant="outlined"
    value = {formData.user_id}
    onChange={onChangehandler}/>
    
</FormControl>

<FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">Password</InputLabel>
    <OutlinedInput 
    type="text" 
    name="password" 
    label='Password'
    color="primary" 
    required={true}
    variant="outlined"
    value = {formData.password}
     onChange={onChangehandler}/>
    
</FormControl>

        <Button color="primary" variant="contained" sx={{m:1, width:'20ch'}} onClick={onDeletehandler} >Delete</Button>
       
        
        </div>
        </form>
        </Box>
        
        </Box>
        </ThemeProvider>
        </Box>
        </PerfectScrollbar>
  )
}
