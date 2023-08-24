/* eslint-disable no-loop-func */
import React from 'react'
import { Box } from '@mui/material'
import {ThemeProvider }from '@mui/material'
import theme from '../theme'
import {Typography} from '@mui/material'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css'
import {  toast } from 'react-toastify'
import PerfectScrollbar from 'react-perfect-scrollbar'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import {Modal} from '@mui/material'
import {FormControl,OutlinedInput} from '@mui/material'
import {InputLabel} from '@mui/material'
import {Button} from "@mui/material";

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

const divider_style = {
  width: 400,
  maxWidth: 360,
  bgcolor: '#ccfceb',
  margin:1
};

export default function ShowChapter(show_row) {
  const admin_name = sessionStorage.getItem('First_Name').replaceAll('"','')

  const [delete_file,setdelete_file] = React.useState("")

  const [delete_file_name,setdelete_file_name] = React.useState("")

  const delete_chapter_id = show_row.row.Chapter_ID

  const [course_Name,setcourse_Name] = React.useState("")

  const [open_delete, setOpen_delete] = React.useState(false);

  const handleOpen_delete = () => {
    setOpen_delete(true);
  }

  const handleClose_delete = () => setOpen_delete(false);

  let fileArray = []

  let fileNameArray = []

  let file_array = []

  const [formData,setFormData] = React.useState({
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


  const getCourse_Name = () => {
    axios.get("http://127.0.0.1:8000/api/Course/"+show_row.row.Course_ID)
    .then((response)=>{
      setcourse_Name(response.data.course_title)
    })
  }

  const getFiles_Data = () =>{
    fileArray=show_row.row.Chapter_File.split(',')
    fileNameArray=show_row.row.Chapter_File_Name.split(',')
    let newFile

    for(let i=0;i<fileArray.length;i++){
      newFile = {
        key: fileNameArray[i],
        value: fileArray[i],
      };
      file_array.push(newFile)
    }
    
    return (
      <Box>
      <List >
      {file_array.map((file, Index) => (
        <Box sx={divider_style}>
          <Divider />
        <ListItem key={Index} sx={{
              display:'flex',
              justifyContent:'space-between'
            }}>
          <a href={file.value} target="_blank" rel="noreferrer" style={{
            textDecoration:'none',
            color:'black'
          }} >
            
            <ListItemText primary={file.key}/> </a>
          <DeleteIcon color='primary' onClick={()=>handleOpen_delete()}/>
          
        </ListItem>
        <Divider />
        </Box>
      ))}
    </List>
    <Modal

    open={open_delete}
    onClose={handleClose_delete}
  >
    {open_delete?
    <Box sx={style}>
   {handle_delete_file()}

  </Box>:
  <Box></Box>
  }
    
    
  </Modal>
  </Box>
      );

      
  }

  const handle_delete_file = () => {
    const onDeletehandler= () => {
      axios.post("http://127.0.0.1:8000/api/Login",{
        user_id:formData.user_id,
        password:formData.password
          })
          .then((response)=>{
            if(response.status === 200){
              axios.delete("http://127.0.0.1:8000/api/Chapter/delete_file/"+delete_chapter_id,{
                headers: {
                  'chapter_id': delete_chapter_id,
                  'url': delete_file
                }
              }).then((response)=>{
                if(response.status===200){
                  toast.success('File Deleted',{
                    position:toast.POSITION.BOTTOM_CENTER
                  })
                  window.location.reload(true)
                }else{
                  toast.error('Error While deleting file, Please try again',{
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
             <Typography sx={{m:2,fontSize:30,fontWeight:'bold'}}>Please Verify that you're {admin_name}</Typography>
             
  
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


  return (
    <PerfectScrollbar>
       {
            React.useEffect(()=>{
      getCourse_Name()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
      }

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
          
        <div className="d-flex flex-column justify-content-center align-items-center mx-auto">
           <Typography sx={{m:2,fontSize:30,fontWeight:'bold'}}>{show_row.row.Chapter_Title}</Typography>

           <Typography sx={{m:2,fontSize:20,fontWeight:'bold'}}>Chapter Description</Typography>

           <Typography variant='h6'>{show_row.row.Chapter_Description}</Typography>

           <Typography sx={{fontWeight:'bold'}} variant='h6'>This Chapter is a part of the course: {course_Name}</Typography>

           <Typography sx={{m:2,fontSize:20,fontWeight:'bold'}} >Chapter Contents</Typography>

           

           <Typography>
           {getFiles_Data()}
           </Typography>

           


           
        {/* <Box sx={{display:'flex'}}>
        <Button color="primary" variant="contained" sx={{m:1, width:'20ch'}} onClick={onUpdatehandler} >Update</Button>
        <Button color="primary" variant="contained" sx={{m:1, width:'20ch'}} 
        onClick={()=>{
          handleOpen_add(edit_row.row.Chapter_ID)
        }
        } >
          Add File 
          </Button>
          <Modal

        open={open_add}
        onClose={handleClose_add}
      >
        {open_add?
        <Box sx={style}>
        < AddFile row={add_row} />
      </Box>:
      <Box></Box>
      }
        
        
      </Modal>
        
        </Box> */}
        </div>
        
        </Box>
        
        </Box>
        </ThemeProvider>
        </Box>
        </PerfectScrollbar>
  )
}
