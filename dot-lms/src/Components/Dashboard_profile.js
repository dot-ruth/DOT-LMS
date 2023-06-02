import { Box,Typography } from "@mui/material"
import { Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Calendar from "react-calendar";


export default function DashboardProfile(){
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
        >FirstName LastName</Typography>
        <Typography variant="subtitle2" color='#ffffff'>Department</Typography>
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