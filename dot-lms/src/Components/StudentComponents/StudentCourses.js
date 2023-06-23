import React from 'react'
import { Typography,Box } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import { Link } from "react-router-dom";


export default function StudentCourses(){
  const first_name = localStorage.getItem('First_Name').replaceAll('"','')
   
    return (
        <Box>
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
          image=" "
          alt="Course Title's Img"
        />
        <CardContent >
        <Link to="/">
          <Typography  variant="h6" component="div" sx={{ color: '#68cca9'}}>
           Course Title
          </Typography>
          </Link>
        </CardContent>
      </CardActionArea>
      
      <CardActions>
        <Button size="small" color="primary" variant="contained" sx={{ml:'auto'}}>
          Course Topic
        </Button>
      </CardActions>
    </Card>
        </Box>
    )
}
