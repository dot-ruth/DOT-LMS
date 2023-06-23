import TeacherSideDrawer from "./TeacherSideDrawer";
import TeacherCourses from "./TeacherCourses";
import TeacherDashboardProfile from "./TeacherDashboardProfile";
import theme from "./theme";
import { Box, ThemeProvider } from "@mui/material";
export default function TeacherDashboard(){
    return (
        
        <Box>
            <ThemeProvider theme={theme}>
        <TeacherSideDrawer/> 
        <Box 
        sx={{ml: `calc(${theme.spacing(7)} + 15px)`,
        display:'flex', 
        justifyContent:'space-between',
        height:'100vh',
        overflowY:'hidden',
        }}>
            <Box sx={{mt:1}}>
        <TeacherCourses />
        </Box>
        <Box sx={{backgroundColor:'#3aa680',width:'350px'}}>
        <TeacherDashboardProfile/>
        </Box>
        </Box>
        </ThemeProvider>
        </Box>
    ) 
         
}
