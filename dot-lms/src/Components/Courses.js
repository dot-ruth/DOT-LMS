import { Typography,Box } from "@mui/material";
//import * as React from 'react';
import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import WavingHandIcon from '@mui/icons-material/WavingHand';


export default function Courses(){
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
          <Typography  variant="h6" component="div" sx={{ color: '#68cca9'}}>
           Course Title
          </Typography>
          <Typography sx={{m:1}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Vestibulum eget orci diam. Sed porttitor nibh sit amet risus tempor, eu aliquam felis efficitur. 
          Etiam in auctor nisl. Suspendisse et felis quis est facilisis iaculis.
          </Typography>
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