import React , {  useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box } from '@mui/material';
import {  toast } from 'react-toastify';
import {ThemeProvider }from '@mui/material';
import theme from '../theme';
import {Typography }from '@mui/material';
import {FormControl} from '@mui/material';
import {InputLabel} from '@mui/material';
import {OutlinedInput }from '@mui/material';
import {Button} from '@mui/material';
import axios from 'axios'

export default function AddbyCSV() {

      const [File,setFile] = useState()

      let FileUpload = (e) => {
        setFile(e.target.files[0]) 
      }
  
        const onAddhandler = () =>{
            axios.post("http://127.0.0.1:8000/api/Student/AddbyCSV",{
                csv_file:File,
              },{
                headers: {
                  'Content-Type': 'multipart/form-data',
                }},
              toast.info('Adding Students...',{
                position:toast.POSITION.BOTTOM_CENTER
              })
              ).then((response)=>{
                console.log(response)
                if(response.status===200){
                toast.success('Students Added',{
                  position:toast.POSITION.BOTTOM_CENTER
                })
                window.location.reload(true)
              }else{
                toast.error('Error While adding Students, Please try again',{
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
           <Typography sx={{m:2,fontSize:30,fontWeight:'bold'}}>Add Students by CSV file</Typography>
           

<FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">CSV File</InputLabel>
    <OutlinedInput 
    type="file" 
    name="csv_file" 
    label='CSV File'
    color="primary" 
    required={true}
    variant="outlined"
    onChange={FileUpload}/>
    
</FormControl>





        <Box sx={{display:'flex'}}>
        <Button color="primary" variant="contained" sx={{m:1, width:'20ch'}} onClick={onAddhandler} >Add Students</Button>
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

