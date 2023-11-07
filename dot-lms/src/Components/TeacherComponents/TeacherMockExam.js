import { Typography,Box } from "@mui/material";
import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from "react-router-dom";
import axios from "axios";
import TeacherSideDrawer from "./TeacherSideDrawer";
import theme from "../theme";
import { ThemeProvider } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Visibility } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import EditExam from "./EditExam";
import { ToastContainer } from "react-toastify";
import DeleteVerfication from "./DeleteVerfication";
import AddExam from "./AddExam";

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

export default function TeacherMockExam(){

  const teacher_id = sessionStorage.getItem('id').replaceAll('"','')
  const [Exam_Data_Array,setExam_Data_Array]= useState([])
  let TopicArray = []
  const [topic_array,settopic_array] = useState([])

  function getExam  (Teacher_id) {
axios.get("http://127.0.0.1:8000/api/Mockexams/Exam/" + Teacher_id)
.then((response)=>{
  setExam_Data_Array(response.data.Exam)
  for(let i=0;i<response.data.Exam.length;i++){
    TopicArray.push(response.data.Exam[i]['exam_topic'].split(','))
  }
  settopic_array(TopicArray)
  console.log(response.data)

})

  }

  const [isHovered, setIsHovered] = useState(false);

  const [open_edit, setOpen_edit] = React.useState(false);

  const [edit_row,setedit_row] = React.useState();

  const handleOpen_edit = (row) => {
    setOpen_edit(true);
    setedit_row(row);
  }

  const handleClose_edit = () => setOpen_edit(false);

  const [open_delete, setOpen_delete] = React.useState(false);

  const [delete_row,setdelete_row] = React.useState();

  const handleOpen_delete = (row) => {
    setOpen_delete(true);
    setdelete_row(row);
  }

  const handleClose_delete = () => setOpen_delete(false);

  const [open_add, setopen_add] = React.useState(false);

  const handleopen_add = () =>  setopen_add(true);
  

  const handleClose_add = () => setopen_add(false);

 
    return (
      
        <Box>

<ToastContainer/>

           {
      React.useEffect(()=>{
getExam(teacher_id)
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])
}
            <ThemeProvider theme={theme}>
        <TeacherSideDrawer/> 
        <Box 
        sx={{ml: `calc(${theme.spacing(7)} + 15px)`,
        height:'100vh',
        overflowY:'hidden',
        }}>
            <Box sx={{mt:1}}>

              <Box sx={{display:'flex',justifyContent:'space-between'}}>

            <Typography variant="h5" noWrap component="div"
        sx={{
            fontWeight:'bold',
            m:1
        }}
        >Mock Exams
        
        </Typography>

        <Button color="primary" variant="contained" sx={{m:1, width:'20ch'}} onClick={()=>handleopen_add()} >Add Exam</Button>

        </Box>

        <Box sx={{display:'flex'}}>
{Exam_Data_Array.map((Exam_Data,i) => (

  <Box
  onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}
  >
             <Card 
             
             sx={{ 
              width: 345,
              height: 450,
                 m:1,
                 display:'flex', 
                 flexDirection:'column',
                 position:'absolute',
                //  zIndex:-1,
                 p:1,
                 }} variant="outlined" color="#68cca9">
               <CardActionArea>
                 <CardMedia
                   component="img"
                   height="140"
                   image="http://127.0.0.1:8000/storage/mock%20exam%20image.jpg"
                   alt="Course Title's Img"
                 />
                 <CardContent >
                   <Typography  variant="h6" component="div" style={{
                     color: '#68cca9',
                     textDecoration:'none'
                     }}>
                    {Exam_Data['exam_title']}
                   </Typography>
                 </CardContent>
               </CardActionArea>
               
               <CardActions>
                {topic_array[i].map((topic)=>(
                  <Button size="small" color="primary" variant="contained" sx={{ml:'auto'}}>
                   {topic}
                 </Button>
                ))}


               </CardActions>

               </Card>

               <Box  sx={{
//  display: isHovered ? "block" : "none",
display: isHovered ? "flex" : "none",
 alignSelf:'center',
 backgroundColor:'rgba(204, 252, 235, 0.7)',
width: 345,
              height: 450,
 position:'relative',
 justifyContent:'center',
 alignItems:'center',
         top:0,
         left:0,
         margin:1,
               }}
               >

<Link to={Exam_Data['exam_content']} target="_blank" >
                  <Visibility sx={{
                    textDecoration:'none',
                    color:'white',
                    fontSize:50,
                    margin:1
                }}/></Link>
                  <EditIcon sx={{
                    color:'white',
                    fontSize:50,
                    margin:1
                  }} onClick={()=>handleOpen_edit(Exam_Data)}/>
                  <DeleteIcon sx={{
                    color:'white',
                    fontSize:50,
                    margin:1
                  }} onClick={()=>handleOpen_delete(Exam_Data)}/>

</Box>

               
             
</Box>


          ))}
          </Box>

          <Modal

        open={open_edit}
        onClose={handleClose_edit}
      >
        {open_edit?
        <Box sx={style}>
        < EditExam row={edit_row} />
      </Box>:
      <Box></Box>
      }
        
        
      </Modal>

      <Modal

        open={open_delete}
        onClose={handleClose_delete}
      >
        {open_delete?
        <Box sx={style}>
        < DeleteVerfication row={delete_row} />
      </Box>:
      <Box></Box>
      }
        
        
      </Modal>

      <Modal

        open={open_add}
        onClose={handleClose_add}
      >
        {open_add?
        <Box sx={style}>
        < AddExam  />
      </Box>:
      <Box></Box>
      }
        
        
      </Modal>
        
        </Box>
        </Box>
        </ThemeProvider>
        </Box>
        
    )
}



