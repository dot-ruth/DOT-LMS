import { Box,Typography } from "@mui/material"
import { Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Calendar from "react-calendar";

export default function TeacherDashboardProfile(){

    const first_name = sessionStorage.getItem('First_Name').replaceAll('"','')
    
  const last_name = sessionStorage.getItem('Last_Name').replaceAll('"','')
  
  const department = sessionStorage.getItem('Department').replaceAll('"','')
  
    return (
        <Box>
       <Typography variant="h6" 
        sx={{
            fontWeight:'bold',
            m:2,
            color:'#ffffff'
        }}
        >Profile</Typography>
        {/* profile name */}
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
        }}>
            <Avatar sx={{m:1}}><PersonIcon/></Avatar>
            <Typography variant="h6" 
        sx={{
            fontWeight:'bold',
            color:'#ffffff'
        }}
        >{first_name} {last_name}</Typography>
        <Typography variant="subtitle2" color='#ffffff'>{department}</Typography>
        <Box sx={{
            backgroudColor:'#ffffff', 
            width:'300px',
            mt:5,
            
    }}>
        <Calendar />
        </Box>
        </Box>

        </Box>
    )
}