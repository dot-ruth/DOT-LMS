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


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EditChapter(edit_row) {

 
  const [formData,setFormData] = useState({
      chapter_title:edit_row.row.Chapter_Title,
      chapter_description:"",
    })

    let onChangehandler = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      let data = {};
      data[name] = value;
      setFormData((prevFormData)=>({...prevFormData,[name]:value}))
      }

      const onUpdatehandler =  () =>{
          axios.put("http://127.0.0.1:8000/api/Chapter/"+edit_row.row.Chapter_ID ,{
              chapter_title:formData.chapter_title,
              chapter_description:formData.chapter_description,
            },
            toast.info('Updating Chapter,please wait a moment...',{
              position:toast.POSITION.BOTTOM_CENTER
            })
            ).then((response)=>{
              console.log(response)
              if(response.status === 200){
              toast.success('Chapter updated Successfully',{
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
            <form>
        <div className="d-flex flex-column justify-content-center align-items-center mx-auto">
           <Typography sx={{m:2,fontSize:30,fontWeight:'bold'}}>Update Chapter Form</Typography>
           

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
<InputLabel color="primary">Chapter Description</InputLabel>
    <OutlinedInput 
    type="text" 
    name="chapter_description" 
    label='Chapter Description'
    color="primary" 
    required={true}
    variant="outlined"
    multiline
    value = {formData.chapter_description}
     onChange={onChangehandler}/>
    
</FormControl>



        <Box sx={{display:'flex'}}>
        <Button color="primary" variant="contained" sx={{m:1, width:'20ch'}} onClick={onUpdatehandler} >Update</Button>
        
        </Box>
        </div>
        </form>
        </Box>
        
        </Box>
        </ThemeProvider>
        </Box>
        </PerfectScrollbar>
  )
}













