import SideDrawer from "./SideDrawer";
import Courses from "./Courses";
import DashboardProfile from "./Dashboard_profile";
import theme from "./theme";
import { Box, ThemeProvider } from "@mui/material";
export default function StudentDashboard(){
    return (
        
        <Box>
            <ThemeProvider theme={theme}>
        <SideDrawer/> 
        <Box 
        sx={{ml: `calc(${theme.spacing(7)} + 15px)`,
        display:'flex', 
        justifyContent:'space-between',
        height:'100vh',
        overflowY:'hidden',
        }}>
            <Box sx={{mt:1}}>
        <Courses />
        </Box>
        <Box sx={{backgroundColor:'#3aa680',width:'350px'}}>
        <DashboardProfile/>
        </Box>
        </Box>
        </ThemeProvider>
        </Box>
    ) 
         
}