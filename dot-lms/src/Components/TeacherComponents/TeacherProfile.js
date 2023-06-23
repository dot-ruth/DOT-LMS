import { Box,ThemeProvider } from "@mui/material"
import theme from "./theme";
import TeacherSideDrawer from "./TeacherSideDrawer";

export default function TeacherProfile(){
    
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
            <h1>Profile</h1>
        </Box>
        </Box>
        </ThemeProvider>
        </Box>
        
    )
}
