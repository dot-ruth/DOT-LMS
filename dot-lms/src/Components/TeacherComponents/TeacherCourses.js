import { Typography,Box } from "@mui/material";
import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import { Link } from "react-router-dom";
import axios from "axios";


export default function TeacherCourses(){
  const first_name = sessionStorage.getItem('First_Name').replaceAll('"','')
  const teacher_id = sessionStorage.getItem('id').replaceAll('"','')
  const [Course_Data_Array,setCourse_Data_Array]= useState([])
  let TopicArray = []
  const [topic_array,settopic_array] = useState([])

  function getAssignedCourse  (Teacher_id) {
axios.get("http://127.0.0.1:8000/api/Teacher/AssignedCourse/" + Teacher_id)
.then((response)=>{
  setCourse_Data_Array(response.data.Course_Data)
  for(let i=0;i<response.data.Course_Data.length;i++){
    TopicArray.push(response.data.Course_Data[i]['course_topic'].split(','))
  }
  settopic_array(TopicArray)
  console.log(topic_array)
})

  }

    return (
        <Box>
           {
      React.useEffect(()=>{
getAssignedCourse(teacher_id)
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])
}
{/* {console.log(Course_Data_Array[0]['course_id'])} */}
        <Typography variant="h5" 
        sx={{
            fontWeight:'bold',
            m:1
        }}
        >Hello {first_name} <WavingHandIcon color="primary"/>
        </Typography>
        <Typography variant="h5" noWrap component="div"
        sx={{
            fontWeight:'bold',
            m:1
        }}
        >Courses</Typography>
        <Box sx={{display:'flex'}}>
{Course_Data_Array.map((Course_Data,i) => (
  
             <Card 
             sx={{ 
                 maxWidth: 345,
                 m:1,
                 display:'flex', 
                 flexDirection:'column',
                 p:0.3,
                 }} variant="outlined" color="#68cca9">
                   
               <CardActionArea>
                 <CardMedia
                   component="img"
                   height="140"
                   image={Course_Data['course_img']}
                   alt="Course Title's Img"
                 />
                 <CardContent >
                 <Link to='/Teacher/ShowCourse' state={{course_id:Course_Data['course_id']}}>
                   <Typography  variant="h6" component="div" style={{
                     color: '#68cca9',
                     textDecoration:'none'
                     }}>
                    {Course_Data['course_title']}
                   </Typography>
                   </Link>
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
          ))}
          </Box>
   
        </Box>
    )
}
