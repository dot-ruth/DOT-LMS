import { Box,ThemeProvider } from "@mui/material"
import theme from "./theme";
import StudentSideDrawer from "./StudentComponents/StudentSideDrawer";
import TeacherSideDrawer from "./TeacherComponents/TeacherSideDrawer";


export default function Message(){

    const role = localStorage.getItem('role');
    const student = '"student"'
  
    return (
        <Box>
            <ThemeProvider theme={theme}>
                {role === student?<StudentSideDrawer/> :<TeacherSideDrawer/> }
        
        <Box 
        sx={{ml: `calc(${theme.spacing(7)} + 15px)`,
        display:'flex', 
        justifyContent:'space-between',
        height:'100vh',
        overflowY:'hidden',
        }}>
            <Box sx={{mt:1}}>
            <h1>Message</h1>
        </Box>
        </Box>
        </ThemeProvider>
        </Box>
        
    )
}