import { Box,ThemeProvider,Typography } from "@mui/material"
import theme from "../theme";
import StudentSideDrawer from "./StudentSideDrawer";
import {Card,CardActionArea,CardMedia,CardContent,CardActions,Button} from "@mui/material";
import { Link } from "react-router-dom";
import  { useState,useEffect } from "react";
import axios from "axios";
import { Visibility } from "@mui/icons-material";

export default function StudentMockExam(){

  const [Exam_Data_Array,setExam_Data_Array]= useState([])
  let TopicArray = []
  const [topic_array,settopic_array] = useState([])
  const course_id = sessionStorage.getItem('course_id').replaceAll('"','')
  const [isHovered, setIsHovered] = useState(false);
 // console.log(course_id)
  function getExam  () {
axios.get("http://127.0.0.1:8000/api/Mockexams/Exam/Student/" + course_id)
.then((response)=>{
  setExam_Data_Array(response.data.Exam)
  for(let i=0;i<response.data.Exam.length;i++){
    TopicArray.push(response.data.Exam[i]['exam_topic'].split(','))
  }
  settopic_array(TopicArray)
  console.log(response.data)

})

  }

    return (
        <Box>
            <ThemeProvider theme={theme}>
            {
      useEffect(()=>{
        getExam()
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])
}
        <StudentSideDrawer/> 
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

</Box>

               
             
</Box>


          ))}
          </Box>

        
        </Box>
        </Box>
        </ThemeProvider>
        </Box>
        
    )
}

