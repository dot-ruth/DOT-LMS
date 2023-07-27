import * as React from 'react';
import theme from "../theme";
import { Box, ThemeProvider } from "@mui/material";
import AdminSideDrawer from "./AdminSideDrawer";
import {Paper }from '@mui/material';
import axios from "axios";
import {styled} from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import {TableCell,tableCellClasses,TableRow,TableContainer,Table,TableHead,TableBody} from '@mui/material';
import EditCourse from './EditCourse';
import Typography from '@mui/material/Typography';import {Button} from '@mui/material';
import 'react-perfect-scrollbar/dist/css/styles.css'
import AddCourse from './AddCourse';
import {Visibility} from "@mui/icons-material";

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
  
      // backgroundColor: theme.palette.secondary.main,
  
      color: theme.palette.common.white
    },
  }));

export default function ManageCourses() {

    function create_course_Data(Course_Title,Course_ID,Course_Topic) {
        return { Course_Title,Course_ID,Course_Topic};
      }

    const [course_rows,setcourse_rows] = React.useState([])

    let coursearray = []

    const [open_edit, setOpen_edit] = React.useState(false);

    const [open_add, setOpen_add] = React.useState(false);

    const [edit_row,setedit_row] = React.useState();

    const handleOpen_edit = (row) => {
      setOpen_edit(true);
      setedit_row(row);
    }

    const handleOpen_add = () => setOpen_add(true);
  
    const handleClose_edit = () => setOpen_edit(false);

    const handleClose_add = () => setOpen_add(false);

    const getCourseData =()=>{
        axios.get("http://127.0.0.1:8000/api/Course")
          .then((response)=>{
            console.log(response.data.courses)
            for (let i = 0; i < response.data.courses.length; i++) {
              coursearray.push(create_course_Data(response.data.courses[i]['course_title'], response.data.courses[i]['course_id'],response.data.courses[i]['course_topic']))  
        }
        setcourse_rows(coursearray)
      })
      }

      function delete_course(course_id){
        axios.delete("http://127.0.0.1:8000/api/Course/"+course_id)
        .then(()=>{
         toast.success('Course deleted Successfully',{
           position:toast.POSITION.BOTTOM_CENTER
         })
         window.location.reload(true)
        })
      }

    return (
        <Box>
            <ThemeProvider theme={theme}>
            <ToastContainer/>
            {
            React.useEffect(()=>{
      getCourseData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
      }
        <AdminSideDrawer/>
        <Box 
        sx={{ml: `calc(${theme.spacing(7)} + 15px)`,
        display:'flex', 
        justifyContent:'space-between',
        height:'100vh',
        overflowY:'hidden',
        }}>
            <Box sx={{mt:1,
            width:'100vw'
            }}>
            <Box sx={{
        display:'flex',
        justifyContent:'space-between'
      }}>
      <Typography variant='h6' style={{ fontWeight:'bold'}}>Course List</Typography>
      <Button variant='contained' style={{backgroundColor:'primary'}} onClick={handleOpen_add}>Add Course</Button>
      <Modal
        open={open_add}
        onClose={handleClose_add}
      >
        <Box sx={style}>
          < AddCourse />
        </Box>
      </Modal>

      </Box>
      {course_rows? 
      
      <TableContainer component={Paper} style={{
        marginTop:'5px',
        height:'100vh'
        }}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >Course Title</StyledTableCell>
            <StyledTableCell >Course ID</StyledTableCell>
            <StyledTableCell >Course Topic</StyledTableCell>
            <StyledTableCell > </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {course_rows.map((row,i) => (
            <StyledTableRow key={i}>
              <StyledTableCell >{row.Course_Title}</StyledTableCell>
              <StyledTableCell >{row.Course_ID}</StyledTableCell>
              <StyledTableCell >{row.Course_Topic}</StyledTableCell>
              <StyledTableCell> <Visibility color='primary'/>  <EditIcon color='primary' onClick={()=>handleOpen_edit(row)}/>   <DeleteIcon color='primary' onClick={()=>delete_course(row.Course_ID)}/></StyledTableCell>
            </StyledTableRow>
          ))}

          

<Modal

        open={open_edit}
        onClose={handleClose_edit}
      >
        {open_edit?
        <Box sx={style}>
        < EditCourse row={edit_row} />
      </Box>:
      <Box></Box>
      }
        
        
      </Modal>
          
        </TableBody>
      </Table>
    </TableContainer>
    
: 
<Box></Box>
}
        </Box>
        </Box>
        </ThemeProvider>
        </Box>
    )
}

