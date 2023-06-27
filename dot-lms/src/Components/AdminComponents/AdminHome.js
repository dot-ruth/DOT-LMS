import * as React from 'react';
import {  ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import theme from '../theme'
import { CardActionArea,CardContent,Card } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import BookIcon from '@mui/icons-material/Book';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'  
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function AdminHome() {
  return (
    <ThemeProvider theme={theme}>
    <Box style={{
          display:'flex',
          flexDirection:'row'
          }}>
       <Card style={{
        width:280,
        height:280,
        border:"2px solid #68cca9",
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'5px',
        marginLeft:'15px',
       }}>
        <CardActionArea>
        <CardContent sx={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center'
        }} >
            
          <PersonIcon fontSize='large' style={{fontWeight:'bold',margin:5,fontSize:'70px',color:'#68cca9'}}/>
          <Typography  variant="subtitle1" style={{margin:1}}>
           Total Number of Students
          </Typography>
           <Typography variant='h6' style={{fontWeight:'bold',margin:5,fontSize:'40px'}}>0</Typography>
          
        </CardContent>
      </CardActionArea>
      </Card>

      

      <Card style={{
        border:"2px solid #68cca9",
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'5px',
        marginLeft:'15px',
        width:280,
        height:280,
       }}>
        <CardActionArea>
        <CardContent sx={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center'
        }} >
            
          <BookIcon fontSize='large' style={{fontWeight:'bold',margin:5,fontSize:'70px',color:'#68cca9'}}/>
          <Typography  variant="subtitle1" style={{margin:1}}>
           Total Number of Departments
          </Typography>
           <Typography variant='h6' style={{fontWeight:'bold',margin:5,fontSize:'40px'}}>0</Typography>
          
        </CardContent>
      </CardActionArea>
      </Card>

      <Card style={{
        border:"2px solid #68cca9",
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'5px',
        marginLeft:'15px',
        width:280,
        height:280,
       }}>
        <CardActionArea>
        <CardContent sx={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center'
        }} >
            
          <CastForEducationIcon fontSize='large' style={{fontWeight:'bold',margin:5,fontSize:'70px',color:'#68cca9'}}/>
          <Typography  variant="subtitle1" style={{margin:1}}>
           Total Number of Courses
          </Typography>
           <Typography variant='h6' style={{fontWeight:'bold',margin:5,fontSize:'40px'}}>0</Typography>
          
        </CardContent>
      </CardActionArea>
      </Card>

      <Card style={{
        border:"2px solid #68cca9",
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'5px',
        marginLeft:'15px',
        width:280,
        height:280,
       }}>
        <CardActionArea>
        <CardContent sx={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center'
        }} >

<PersonIcon fontSize='large' style={{fontWeight:'bold',margin:5,fontSize:'70px',color:'#68cca9'}}/>
         <Typography  variant="subtitle1" style={{margin:1}}>
           Total Number of Teachers
          </Typography>
           <Typography variant='h6' style={{fontWeight:'bold',margin:5,fontSize:'40px'}}>0</Typography>
          
        </CardContent>
      </CardActionArea>
      </Card>

    </Box>
    </ThemeProvider>
  );
}