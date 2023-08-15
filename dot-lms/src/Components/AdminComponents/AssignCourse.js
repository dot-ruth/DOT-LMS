import React from 'react'
import theme from "../theme";
import { Box, ThemeProvider } from "@mui/material";
import AdminSideDrawer from "./AdminSideDrawer";
import { CardActionArea,CardContent,Card } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AssignCourseteacher from './AssignCourseteacher';
import AssignCoursestudent from './AssignCoursestudent';
import AssignbyBatch from './AssignbyBatch';

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

export default function AssignCourse() {

    const [open_assign_teacher,setopen_assign_teacher] = React.useState(false)

    const [open_assign_student,setopen_assign_student] = React.useState(false)

    const [open_assign_batch,setopen_assign_batch] = React.useState(false)

    const handleOpen_assign_teacher = () => setopen_assign_teacher(true)

    const handleClose_assign_teacher = () => setopen_assign_teacher(false)

    const handleOpen_assign_student = () =>setopen_assign_student(true)

    const handleClose_assign_student = () => setopen_assign_student(false)

    const handleOpen_assign_batch = () => setopen_assign_batch(true)

    const handleClose_assign_batch = () => setopen_assign_batch(false)
  return (
    <Box>
            <ThemeProvider theme={theme}>
        <AdminSideDrawer/>
        <Box 
        sx={{ml: `calc(${theme.spacing(7)} + 15px)`,
        display:'flex', 
        justifyContent:'space-between',
        
        }}>
            <Box sx={{
                mt:1,
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                }}>
            <Card style={{
        border:"2px solid #68cca9",
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'5px',
        marginLeft:'15px',
        width:375,
        height:200,
       }}>
        <CardActionArea onClick={handleOpen_assign_teacher}>
        <CardContent sx={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center'
        }} >

<AssignmentTurnedInIcon fontSize='large' style={{fontWeight:'bold',margin:5,fontSize:'70px',color:'#68cca9'}}/>
         
          <Typography variant='h6' style={{fontWeight:'bold',margin:5}}>Assign Course to a Teacher</Typography>
           
          
        </CardContent>
      </CardActionArea>
      </Card>

      <Modal
        open={open_assign_teacher}
        onClose={handleClose_assign_teacher}
      >
        <Box sx={style}>
          < AssignCourseteacher />
        </Box>
      </Modal>

      <Card style={{
        border:"2px solid #68cca9",
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'5px',
        marginLeft:'15px',
        width:375,
        height:200,
       }}>
        <CardActionArea onClick={handleOpen_assign_student}>
        <CardContent sx={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center'
        }} >

<AssignmentTurnedInIcon fontSize='large' style={{fontWeight:'bold',margin:5,fontSize:'70px',color:'#68cca9'}}/>
         
          <Typography variant='h6' style={{fontWeight:'bold',margin:5}}>Assign Course to a Student</Typography>
           
          
        </CardContent>
      </CardActionArea>
      </Card>

      <Modal
        open={open_assign_student}
        onClose={handleClose_assign_student}
      >
        <Box sx={style}>
          < AssignCoursestudent />
        </Box>
      </Modal>

      <Card style={{
        border:"2px solid #68cca9",
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'5px',
        marginLeft:'15px',
        width:375,
        height:200,
       }}>
        <CardActionArea onClick={handleOpen_assign_batch}>
        <CardContent sx={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center'
        }} >

<AssignmentTurnedInIcon fontSize='large' style={{fontWeight:'bold',margin:5,fontSize:'70px',color:'#68cca9'}}/>
         
          <Typography variant='h6' style={{
            fontWeight:'bold',
            margin:5,
            textAlign:'center'
            }}>Assign Course to Students Based on Batch</Typography>
           
          
        </CardContent>
      </CardActionArea>
      </Card>

      <Modal
        open={open_assign_batch}
        onClose={handleClose_assign_batch}
      >
        <Box sx={style}>
          < AssignbyBatch />
        </Box>
      </Modal>

        </Box>
        
        </Box>
        </ThemeProvider>
        </Box>
  )
}

