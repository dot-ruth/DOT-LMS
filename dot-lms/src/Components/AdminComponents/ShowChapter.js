/* eslint-disable no-loop-func */
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
import { ToastContainer, toast } from 'react-toastify'
import {InputLabel} from '@mui/material'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Modal from '@mui/material/Modal';
import AddFile from './AddFile';
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

  // console.log(show_row)
  // console.log(show_row.row.Chapter_File)
  // console.log(show_row.row.Chapter_File_Name)
  // console.log(show_row.row.Chapter_ID)
  // console.log(show_row.row.Chapter_Title)
  // console.log(show_row.row.Chapter_Description)
  // console.log(show_row.row.Course_ID)

  const [delete_file,setdelete_file] = React.useState()

  const [open_delete,setopen_delete] = React.useState(false)

  const [course_Name,setcourse_Name] = React.useState("")

  let fileArray = []

  let fileNameArray = []

  let file_array = []

  //const [file_array,setfile_array] = React.useState([])

  // <button onClick={() => }>Change Fruits</button>


  const handleOpen_delete = (file) => {
    setopen_delete(true)
    setdelete_file(file)
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
          <DeleteIcon color='primary' onClick={()=>handleDelete_file()}/>
          
        </ListItem>
        <Divider />
        </Box>
      ))}
    </List>
      );
  }

  // const onDelete =  () => {

  // }


  const handleDelete_file = () => {
    toast.success(
      "Are you sure",
      {
        position: "top-right",
        duration: 3000,
        closeButton: true,
        action: {
          text: "View Details",
          onClick: () => {
            console.log("Action button clicked!");
          },
        },
        target: {
          element: document.body,
          selector: "#modal",
        },
      },
    );
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
          <ToastContainer/>
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
