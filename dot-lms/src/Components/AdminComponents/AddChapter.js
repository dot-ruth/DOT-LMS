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

export default function AddChapter(chapter) {

  console.log(chapter.courseID)

  const [formData,setFormData] = useState({
    chapter_title:"",
    course_id:chapter.courseID,
    file_name:"",
    chapter_description:"",
  })

  const [File,setFile] = useState()

      let onChangehandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        setFormData((prevFormData)=>({...prevFormData,[name]:value}))
        }

        let FileUpload = (e) => {
          setFile(e.target.files[0]) 
        }

        const onCreatehandler =  () =>{
            axios.post("http://127.0.0.1:8000/api/Chapter",{
                chapter_title:formData.chapter_title,
                course_id:formData.course_id,
                file_name:formData.file_name,
                chapter_contents:File,
                chapter_description:formData.chapter_description,
              },{
              headers: {
                'Content-Type': 'multipart/form-data',
              }},
              toast.info('Adding Chapter,please wait a moment...',{
                position:toast.POSITION.BOTTOM_CENTER
              })
              ).then((response)=>{
                console.log(response)
                if(response.status === 200){
                toast.success('Chapter added Successfully',{
                  position:toast.POSITION.BOTTOM_CENTER
                })
                window.location.reload(true)
              }else{
                toast.error('Error While adding chapter, Please try again',{
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
           <Typography sx={{m:2,fontSize:30,fontWeight:'bold'}}>Add Chapter Form</Typography>
           

           <FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">Chapter Title</InputLabel>
    <OutlinedInput 
    type="text" 
    name="chapter_title" 
    label='Chapter Title'
    color="primary" 
    required={true}
    variant="outlined"
    value = {formData.chapter_title}
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
    value = {formData.course_id}
     onChange={onChangehandler}/>
    
</FormControl>

<FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">File Name</InputLabel>
    <OutlinedInput 
    type="text" 
    name="file_name" 
    label='File Name'
    color="primary" 
    required={true}
    variant="outlined"
    value = {formData.file_name}
     onChange={onChangehandler}/>
    
</FormControl>

<FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">File</InputLabel>
    <OutlinedInput 
    type="file" 
    name="chapter_contents" 
    color="primary" 
    label='Course Image'
    required={true}
    variant="outlined"
    //value = {Image}
     onChange={FileUpload}/>
    
</FormControl>

<FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">Chapter Description</InputLabel>
    <OutlinedInput 
    type="text" 
    name="chapter_description" 
    color="primary" 
    label='Chapter Description'
    required={true}
    variant="outlined"
    multiline
    value = {formData.chapter_description}
     onChange={onChangehandler}/>
    
</FormControl>


        <Button color="primary" variant="contained" sx={{m:1, width:'20ch'}} onClick={onCreatehandler} >Add Chapter</Button>
       
        
        </div>
        </form>
        </Box>
        
        </Box>
        </ThemeProvider>
        </Box>
        </PerfectScrollbar>
  )
}


 
