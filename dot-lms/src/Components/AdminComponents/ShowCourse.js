import React, { useContext, useState } from 'react';
import theme from "../theme";
import axios from "axios";
import { Box, Button, ThemeProvider, Typography } from "@mui/material";
import AdminSideDrawer from "./AdminSideDrawer";
import { useLocation } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Overlay from 'react-bootstrap';


export default function ShowCourse() {

const [course_title,setcourse_title] = useState()

const [course_img,setcourse_img] = useState()

let topicArray = []

const [course_topic_array,setcourse_topic_array] = useState([])

const [course_description,setcourse_description] = useState()

  console.log(useLocation().state.course_id)
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


  return (


    <Box>
            <ThemeProvider theme={theme}>
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
        <Typography variant='h6' sx={{padding:2}}>{course_description}</Typography>
        </Box>
        
        </Box>
        </ThemeProvider>
        </Box>
  )
}
