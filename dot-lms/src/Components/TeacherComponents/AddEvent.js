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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function AddEvent(course_id) {

  const teacher_id = sessionStorage.getItem('id').replaceAll('"','')

    const [formData,setFormData] = useState({
        event_start:"",
        event_end:"",
        event_id:"",
        event_title:"",
      })

      let onChangehandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        setFormData((prevFormData)=>({...prevFormData,[name]:value}))
        }

        const onAddhandler = () =>{
            axios.post("http://127.0.0.1:8000/api/Events",{
                event_start:formData.event_start,
                event_end:formData.event_end,
                event_title:formData.event_title,
                teacher_id:teacher_id,
                course_id:course_id.row
              },
              toast.info('Adding Event...',{
                position:toast.POSITION.BOTTOM_CENTER
              })
              ).then((response)=>{
                console.log(response)
                if(response.status===200){
                toast.success('Event Added',{
                  position:toast.POSITION.BOTTOM_CENTER
                })
                window.location.reload(true)
              }else{
                toast.error('Error While adding event, Please try again',{
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
           <Typography sx={{m:2,fontSize:30,fontWeight:'bold'}}>Add Event</Typography>
           

           <FormControl sx={{ m:2, width:'50ch'}} >
<InputLabel color="primary">Event Title</InputLabel>
    <OutlinedInput 
    type="text" 
    name="event_title" 
    label='Event Title'
    color="primary" 
    required={true}
    variant="outlined"
    value = {formData.event_title}
    onChange={onChangehandler}/>
    
</FormControl>

<FormControl sx={{ m:2, width:'50ch'}}>
<InputLabel color="primary">Event Start Date</InputLabel>
    <OutlinedInput 
    type="date" 
    name="event_start" 
    label='Event Start Date'
    color="primary" 
    required={true}
    variant="outlined"
    value = {formData.event_start}
    onChange={onChangehandler}/>
    </FormControl>
    <FormControl sx={{ m:2, width:'50ch'}}>
    <InputLabel color="primary">Event End Date</InputLabel>
    <OutlinedInput 
    type="date" 
    name="event_end" 
    label='Event End Date'
    color="primary" 
    required={true}
    variant="outlined"
    value = {formData.event_end}
    onChange={onChangehandler}/>
    </FormControl>

        <Box sx={{display:'flex'}}>
        <Button color="primary" variant="contained" sx={{m:1, width:'20ch'}} onClick={onAddhandler} >Add Event</Button>
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
