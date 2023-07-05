import StudentSideDrawer from "./StudentSideDrawer";
import StudentCourses from "./StudentCourses";
import StudentDashboardProfile from "./StudentDashboardProfile";
import theme from "../theme";
import { Box, ThemeProvider } from "@mui/material";
export default function StudentDashboard(){
    return (
        
        <Box>
            <ThemeProvider theme={theme}>
        <StudentSideDrawer/>
        <Box 
        sx={{ml: `calc(${theme.spacing(7)} + 15px)`,
        display:'flex', 
        justifyContent:'space-between',
        height:'100vh',
        overflowY:'hidden',
        }}>
            <Box sx={{mt:1}}>
        <StudentCourses/>
        </Box>
        <Box sx={{backgroundColor:'#3aa680',width:'350px'}}>
        <StudentDashboardProfile/>
        </Box>
        </Box>
        </ThemeProvider>
        </Box>
    ) 
         
}
