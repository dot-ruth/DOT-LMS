import React, {  useState } from 'react';
import theme from "../theme";
import axios from "axios";
import { Box, ThemeProvider, Typography } from "@mui/material";
import { useLocation } from 'react-router-dom';
import {styled} from '@mui/material/styles';
import {Paper }from '@mui/material';
import {Visibility} from "@mui/icons-material";
import Modal from '@mui/material/Modal';
import { ToastContainer } from 'react-toastify';
import PerfectScrollbar from 'react-perfect-scrollbar'
import {TableCell,tableCellClasses,TableRow,TableContainer,Table,TableHead,TableBody} from '@mui/material';
import ShowChapter from '../AdminComponents/ShowChapter';
import StudentSideDrawer from './StudentSideDrawer';
import {Menu} from '@mui/material';
import {MenuItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import QuizIcon from '@mui/icons-material/Quiz';

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

export default function StudentShowCourse() {
  function create_chapter_Data(Chapter_Title,Chapter_ID,Course_ID,Chapter_File_Name,Chapter_File,Chapter_Description) {
    return { Chapter_Title,Chapter_ID,Course_ID,Chapter_File_Name,Chapter_File,Chapter_Description};
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

    const [open_show,setOpen_show] = React.useState(false);

    const [show_row,setshow_row] = React.useState();

    const handleOpen_show = (row) => {
      setOpen_show(true)
      setshow_row(row)
    }
        



    const handleClose_show = () => setOpen_show(false);
  

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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openHamburger = Boolean(anchorEl);
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

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
      
        <StudentSideDrawer/>
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
                <MenuIcon 
                color='primary' 
                onClick={openMenu} 
                aria-controls={openHamburger ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openHamburger ? 'true' : undefined}/>
                <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openHamburger}
        onClose={closeMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>handleOpen_show(row)}> <Visibility color='primary'  sx={{margin:1}}/> Show Chapter Description</MenuItem>
        
       <MenuItem> <Link to='/Student_Mockexam'  state={{course_id:row.Course_ID}} onClick={()=>sessionStorage.setItem("course_id",row.Course_ID)} >
                  <QuizIcon color='primary' sx={{margin:1}}/>Show Related Mock Exams</Link></MenuItem>
        


      </Menu>
                    </StyledTableCell>
          </StyledTableRow>
        ))}


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


