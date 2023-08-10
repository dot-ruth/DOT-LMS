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

export default function AddCourse() {
    const [formData,setFormData] = useState({
        course_title:"",
        course_topic:"",
        course_description:"",
      })

      const [Image,setImage] = useState()

      let onChangehandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        setFormData((prevFormData)=>({...prevFormData,[name]:value}))
        }

        let ImageUpload = (e) => {
          setImage(e.target.files[0]) 
        }

        const onCreatehandler =  () =>{
          //console.log(formData.course_title,formData.course_topic,Image,formData.course_description)
            axios.post("http://127.0.0.1:8000/api/Course",{
                course_title:formData.course_title,
                course_topic:formData.course_topic,
                course_img:Image,
                course_description:formData.course_description,
              },{
              headers: {
                'Content-Type': 'multipart/form-data',
              }},
              toast.info('Adding Course,please wait a moment...',{
                position:toast.POSITION.BOTTOM_CENTER
              })
              ).then((response)=>{
                console.log(response)
                if(response.status === 200){
                toast.success('Course Created Successfully',{
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
            <form   encType="multipart/form-data" >
        <div className="d-flex flex-column justify-content-center align-items-center mx-auto">
           <Typography sx={{m:2,fontSize:30,fontWeight:'bold'}}>Create Course Form</Typography>
           

           <FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">Course Title</InputLabel>
    <OutlinedInput 
    type="text" 
    name="course_title" 
    label='Course Title'
    color="primary" 
    required={true}
    variant="outlined"
    value = {formData.course_title}
    onChange={onChangehandler}/>
    
</FormControl>

<FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">Course Topic</InputLabel>
    <OutlinedInput 
    type="text" 
    name="course_topic" 
    label='Course Topic'
    color="primary" 
    placeholder='Enter the tpoic separated by comma'
    required={true}
    variant="outlined"
    value = {formData.course_topic}
     onChange={onChangehandler}/>
    
</FormControl>

<FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">Course Image</InputLabel>
    <OutlinedInput 
    type="file" 
    name="course_img" 
    color="primary" 
    label='Course Image'
    required={true}
    variant="outlined"
    //value = {Image}
     onChange={ImageUpload}/>
    
</FormControl>

<FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">Course Description</InputLabel>
    <OutlinedInput 
    type="text" 
    name="course_description" 
    color="primary" 
    label='course_description'
    required={true}
    variant="outlined"
    multiline
    value = {formData.course_description}
     onChange={onChangehandler}/>
    
</FormControl>


        <Button color="primary" variant="contained" sx={{m:1, width:'20ch'}} onClick={onCreatehandler} >Create</Button>
       
        
        </div>
        </form>
        </Box>
        
        </Box>
        </ThemeProvider>
        </Box>
        </PerfectScrollbar>
  )
}

 
