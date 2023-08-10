import React, {  useState } from 'react';
import theme from "../theme";
import axios from "axios";
import { Box, Button, ThemeProvider, Typography } from "@mui/material";
import AdminSideDrawer from "./AdminSideDrawer";
import { useLocation } from 'react-router-dom';
import {styled} from '@mui/material/styles';
import {Paper }from '@mui/material';
import {Visibility} from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import { ToastContainer, toast } from 'react-toastify';
import AddChapter from './AddChapter';
import EditChapter from './EditChapter';
import PerfectScrollbar from 'react-perfect-scrollbar'
import {TableCell,tableCellClasses,TableRow,TableContainer,Table,TableHead,TableBody} from '@mui/material';
import ShowChapter from './ShowChapter';
import AddFile from './AddFile';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
 
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#ccfceb',
    color: theme.palette.common.white
  },
}));


export default function ShowCourse() {

  function create_chapter_Data(Chapter_Title,Chapter_ID,Course_ID,Chapter_File_Name,Chapter_File,Chapter_Description) {
    return { Chapter_Title,Chapter_ID,Course_ID,Chapter_File_Name,Chapter_File,Chapter_Description};
  }

  function create_file_data(File_Name,File){
    return {File_Name,File}
  }

const [course_title,setcourse_title] = useState()

const [course_img,setcourse_img] = useState()

let topicArray = []

const [course_topic_array,setcourse_topic_array] = useState([])

let chapterFileArray= []

let fileArray = []

const [chapter_file_array,setchapter_file_array] = useState([])

let file_name_array = []

const [chapter_row,setchapter_row] = useState([])

let chapterArray = []

const [course_description,setcourse_description] = useState()

const [open_edit, setOpen_edit] = React.useState(false);

    const [open_add, setOpen_add] = React.useState(false);

    const [open_show,setOpen_show] = React.useState(false);

    const [edit_row,setedit_row] = React.useState();

    const [show_row,setshow_row] = React.useState();

    const handleOpen_edit = (row) => {
      setOpen_edit(true);
      setedit_row(row);
    }
    const handleOpen_show = (row) => {
      setOpen_show(true)
      setshow_row(row)
    }
        

    const handleOpen_add = () => setOpen_add(true);

    const handleClose_show = () => setOpen_show(false);
  
    const handleClose_edit = () => setOpen_edit(false);

    const handleClose_add = () => setOpen_add(false);

    const [open_add_chapter, setOpen_add_chapter] = React.useState(false);

    const [add_chapter_row,setadd_chapter_row] = React.useState();

    const handleOpen_add_chapter= (row) => {
      setOpen_add_chapter(true);
      setadd_chapter_row(row);
    }

    const handleClose_add_chapter = () => setOpen_add_chapter(false);

  const course_id = useLocation().state.course_id
    const getCourseData =()=>{
        axios.get("http://127.0.0.1:8000/api/Course/" + course_id )
          .then((response)=>{
            console.log(response.data) 
            setcourse_title(response.data.course_title)
            setcourse_img(response.data.course_img)
            setcourse_description(response.data.course_description)   
            topicArray.push(response.data.course_topic.split(','))
            setcourse_topic_array(topicArray[0])
      })
      }

      const getChapterData =()=>{
        axios.get("http://127.0.0.1:8000/api/Course/Chapter/" + course_id )
          .then((response)=>{
            let newFile
            for (let i = 0; i < response.data.chapter.length; i++) {
              fileArray.push(response.data.chapter[i].chapter_contents.split(','))
              file_name_array.push(response.data.chapter[i].file_name.split(','))
              chapterArray.push(create_chapter_Data(response.data.chapter[i].chapter_title, response.data.chapter[i].chapter_id,response.data.chapter[i].course_id,response.data.chapter[i].file_name,response.data.chapter[i].chapter_contents,response.data.chapter[i].chapter_description))
            }  
            for(let i=0;i<fileArray.length;i++){
              // chapterFileArray.push(create_file_data(file_name_array[i],fileArray[i]))
              newFile = {
                key:file_name_array[i],
                value:fileArray[i]
              }
              chapterFileArray.push(newFile)
            }
              
        setchapter_row(chapterArray)
        setchapter_file_array(chapterFileArray)
        console.log(chapter_row)
        console.log(chapterFileArray[0])
      })
      }

      function delete_chapter(chapter_id){
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you Sure")) {
          axios.delete("http://127.0.0.1:8000/api/Chapter"+chapter_id)
        .then(()=>{
         toast.success('Chapter deleted Successfully',{
           position:toast.POSITION.BOTTOM_CENTER
         })
         window.location.reload(true)
        })
        } else {
          console.log('cancled deletion')
        }
        
      }


  return (

<PerfectScrollbar>
    <Box>
            <ThemeProvider theme={theme}>
            <ToastContainer/>
            {
            React.useEffect(()=>{
      getCourseData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
      }

{
            React.useEffect(()=>{
      getChapterData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
      }
      
        <AdminSideDrawer/>
        <Box 
        sx={{ml: `calc(${theme.spacing(7)} + 15px)`,
        display:'flex', 
        justifyContent:'space-between',
        height:'100vh',
        }}>
            <Box sx={{mt:1}}>
        

<img
        src={course_img}
        alt=''
        style={{
         position: 'relative',
         top:0,
         left:0,
         width:'100vw',
         height:'35vh'
        }}
        
      />
<Box sx={{
          backgroundColor:'rgba(204, 252, 235, 0.8)',
          width:'100%',
          height:'50vh',
          position:'absolute',
          display:'flex',
          justifyContent:'center',
          alignItems:'flex-end',
          top:0,
          left:0,
          marginBottom:20
          }}>
        <Typography variant='h3' style={{ fontWeight:'bold', color:'white'}}>{course_title}</Typography>
        
        </Box>
        <Box sx={{
          marginTop:5,
          marginBottom:2,
          display:'flex',
          justifyContent:'space-between'
        }}>
        
<Box>
        {course_topic_array.map((topic) => 
          (
            <Box  display='inline' 
            sx={{
              backgroundColor:'#68cca9',
              fontStyle:'bold',
              borderRadius:'10px',
              marginLeft:1,
              paddingTop:1,
              paddingBottom:1,
              paddingLeft:2,
              paddingRight:2,
              color:'white',
              }} >
            {topic}
            </Box>
           
          ))}
          </Box>

          <Button >Change Course Picture</Button>
           

        </Box>
        <Typography variant='h6' sx={{
          paddingTop:1,
          paddingBottom:1,
          paddingLeft:4,
          paddingRight:4
          }}>{course_description}</Typography>

<Box sx={{
        display:'flex',
        justifyContent:'space-between'
      }}>
      <Typography variant='h6' style={{ fontWeight:'bold'}}>Chapter List</Typography>
      <Button variant='contained' style={{backgroundColor:'primary'}} onClick={handleOpen_add}>Add Chapter</Button>
      <Modal
        open={open_add}
        onClose={handleClose_add}
      >
        <Box sx={style}>
          < AddChapter courseID={course_id}/>
        </Box>
      </Modal>

      </Box>

      {chapter_row?
      <TableContainer component={Paper} style={{
        marginTop:'5px',
        height:'100vh'
        }}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >Chapter Title</StyledTableCell>
            <StyledTableCell >Chapter ID</StyledTableCell>
            <StyledTableCell >Chapter File</StyledTableCell>
            <StyledTableCell > </StyledTableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
        {chapter_row.map((row,rowIndex) => 
        (
          <StyledTableRow key={rowIndex}>
            <StyledTableCell >{row.Chapter_Title}</StyledTableCell>
            <StyledTableCell >{row.Chapter_ID}</StyledTableCell>
            <StyledTableCell>
            {chapter_file_array[rowIndex].key.map((row_file,columnIndex)=>
              (
              <StyledTableCell key={columnIndex}><a href={chapter_file_array[rowIndex].value[columnIndex]} target="_blank" rel="noreferrer">{row_file},</a></StyledTableCell>
          
            ))}
            </StyledTableCell>
            <StyledTableCell> 
                <Visibility color='primary' onClick={()=>handleOpen_show(row)}/>
                <EditIcon color='primary' onClick={()=>handleOpen_edit(row)}/> 
                <DeleteIcon color='primary' onClick={()=>delete_chapter(row.Course_ID)}/>
                <NoteAddIcon color='primary' onClick={()=>handleOpen_add_chapter(row.Chapter_ID)}/>
                
                  </StyledTableCell>
          </StyledTableRow>
        ))}
<Modal

      open={open_edit}
      onClose={handleClose_edit}
    >
      {open_edit?
      <Box sx={style}>
      < EditChapter row={edit_row} />
    </Box>:
    <Box></Box>
    }
    </Modal>

    <Modal

      open={open_show}
      onClose={handleClose_show}
    >
      {open_show?
      <Box sx={style}>
      < ShowChapter row={show_row} id='modal'/>
    </Box>:
    <Box></Box>
    }
      
      
    </Modal>

    <Modal

      open={open_add_chapter}
      onClose={handleClose_add_chapter}
    >
      {open_add_chapter?
      <Box sx={style}>
      < AddFile row={add_chapter_row} />
    </Box>:
    <Box></Box>
    }
      
      
    </Modal>
        
      </TableBody>
        
        
      </Table>
    </TableContainer> : <Box></Box>
      }



        </Box>
        
        </Box>
        </ThemeProvider>
        </Box>
        </PerfectScrollbar>
  )
}
