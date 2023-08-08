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

const divider_style = {
  width: 400,
  maxWidth: 360,
  bgcolor: '#ccfceb',
  margin:1
};

export default function ShowChapter(show_row) {

  const [delete_file,setdelete_file] = React.useState("")

  const [delete_file_name,setdelete_file_name] = React.useState("")

  const delete_chapter_id = show_row.row.Chapter_ID

  const [course_Name,setcourse_Name] = React.useState("")

  let fileArray = []

  let fileNameArray = []

  let file_array = []


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
          <DeleteIcon color='primary' onClick={()=>delete_confirmation(file.value,file.key)}/>
          
        </ListItem>
        <Divider />
        </Box>
      ))}
    </List>
      );
  }

  const handleDelete = () => {
    console.log(delete_file_name)
    console.log(delete_file)
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
  }

  const delete_confirmation = (deleteFile,deleteFile_name) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you Sure")) {
      setdelete_file(deleteFile)
      setdelete_file_name(deleteFile_name)
      handleDelete()
    } else {
      console.log('cancled deletion')
    }
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
