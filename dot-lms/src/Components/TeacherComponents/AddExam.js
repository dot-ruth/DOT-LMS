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

export default function AddExam() {

    const teacher_id = sessionStorage.getItem('id').replaceAll('"','')

    const [formData,setFormData] = useState({
        exam_title:"",
        exam_topic:"",
        course_id:"",
      })

      const [Exam_file,setExam_file] = useState()

      let onChangehandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        setFormData((prevFormData)=>({...prevFormData,[name]:value}))
        }

        let FileUpload = (e) => {
            setExam_file(e.target.files[0]) 
          }


        const onAddhandler =  () =>{
    
                      axios.post("http://127.0.0.1:8000/api/Mockexams" ,{
                          exam_title:formData.exam_title,
                          exam_contents:Exam_file,
                          exam_topic:formData.exam_topic,
                          course_id:formData.course_id,
                          teacher_id:teacher_id
                        },{
                            headers: {
                              'Content-Type': 'multipart/form-data',
                            }},
                        toast.info('Adding Exam,please wait a moment...',{
                          position:toast.POSITION.BOTTOM_CENTER
                        })
                        ).then((response)=>{
                          console.log(response)
                          if(response.status === 200){
                          toast.success('Exam Added Successfully',{
                            position:toast.POSITION.BOTTOM_CENTER
                          })
                          window.location.reload(true)
                        }else{
                          toast.error('Error While adding the exam, Please try again',{
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
           <Typography sx={{m:2,fontSize:30,fontWeight:'bold'}}>Add Exam Form</Typography>
           

           <FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">Exam Title</InputLabel>
    <OutlinedInput 
    type="text" 
    name="exam_title" 
    label='Exam Title'
    color="primary" 
    required={true}
    variant="outlined"
    value = {formData.exam_title}
    onChange={onChangehandler}/>
    
</FormControl>

<FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">Exam Topic</InputLabel>
    <OutlinedInput 
    type="text" 
    name="exam_topic" 
    label='Exam Topic'
    color="primary" 
    required={true}
    variant="outlined"
    value = {formData.exam_topic}
     onChange={onChangehandler}/>
    
</FormControl>

<FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">Exam File</InputLabel>
    <OutlinedInput 
     type="file" 
     name="exam_contents" 
     label='Exam File'
     color="primary" 
     required={true}
     variant="outlined"
      onChange={FileUpload}/>
    
</FormControl>

<FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">Course ID</InputLabel>
    <OutlinedInput 
    type="text" 
    name="course_id" 
    color="primary" 
    label='course_id'
    required={true}
    variant="outlined"
    multiline
    value = {formData.course_id}
     onChange={onChangehandler}/>
    
</FormControl>


        <Button color="primary" variant="contained" sx={{m:1, width:'20ch'}} onClick={onAddhandler} >Add</Button>
       
        
        </div>
        </form>
        </Box>
        
        </Box>
        </ThemeProvider>
        </Box>
        </PerfectScrollbar>
  )
}

















