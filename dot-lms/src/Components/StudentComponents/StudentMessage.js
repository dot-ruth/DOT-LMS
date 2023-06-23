import { Box,ThemeProvider } from "@mui/material"
import theme from "./theme";
import StudentSideDrawer from "./StudentSideDrawer";

export default function StudentMessage(){
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
            <h1>Message</h1>
        </Box>
        </Box>
        </ThemeProvider>
        </Box>
        
    )
}
