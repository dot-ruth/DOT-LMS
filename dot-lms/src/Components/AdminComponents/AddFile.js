import React , {  useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box } from '@mui/material';
import { ToastContainer , toast } from 'react-toastify';
import {ThemeProvider }from '@mui/material';
import theme from '../theme';
import {Typography }from '@mui/material';
import {FormControl} from '@mui/material';
import {InputLabel} from '@mui/material';
import {OutlinedInput }from '@mui/material';
import {Button} from '@mui/material';
import axios from 'axios'



export default function AddFile(add_row) {

    console.log(add_row.row)

    const [formData,setFormData] = useState({
        chapter_id:add_row.row,
        file_name:"",
        chapter_contents:""
      })

      const [File,setFile] = useState()

      let FileUpload = (e) => {
        setFile(e.target.files[0]) 
      }

      let onChangehandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        setFormData((prevFormData)=>({...prevFormData,[name]:value}))
        }
  
        const onAddhandler = () =>{
            axios.post("http://127.0.0.1:8000/api/Chapter/Add_File",{
                chapter_id:formData.chapter_id,
                file_name:formData.file_name,
                chapter_contents:File,
              },{
                headers: {
                  'Content-Type': 'multipart/form-data',
                }},
              toast.info('Adding File...',{
                position:toast.POSITION.BOTTOM_CENTER
              })
              ).then((response)=>{
                console.log(response)
                if(response.status===200){
                toast.success('File Added',{
                  position:toast.POSITION.BOTTOM_CENTER
                })
                window.location.reload(true)
              }else{
                toast.error('Error While adding file, Please try again',{
                  position:toast.POSITION.BOTTOM_CENTER
                })
              }
              })
        }

  return (
    <div>
      <PerfectScrollbar>
    <Box
        sx={{
            height:'100vh',
            weidth:'100vw',
          }}>
          <ToastContainer/>
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
           <Typography sx={{m:2,fontSize:30,fontWeight:'bold'}}>Add File Form</Typography>
           

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
<InputLabel color="primary">Chapter ID</InputLabel>
    <OutlinedInput 
    type="text" 
    name="chapter_id" 
    label='Chapter ID'
    color="primary" 
    required={true}
    variant="outlined"
    value = {formData.chapter_id}
    onChange={onChangehandler}/>
    
</FormControl>

<FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">Chapter File</InputLabel>
    <OutlinedInput 
    type="file" 
    name="chapter_contents" 
    label='Chapter File'
    color="primary" 
    required={true}
    variant="outlined"
   // value = {formData.chapter_contents}
     onChange={FileUpload}/>
    
</FormControl>



        <Box sx={{display:'flex'}}>
        <Button color="primary" variant="contained" sx={{m:1, width:'20ch'}} onClick={onAddhandler} >Add File</Button>
        </Box>
        </div>
        </form>
        </Box>
        
        </Box>
        </ThemeProvider>
        </Box>
        </PerfectScrollbar>
    </div>
  )
}

