import { Box,ThemeProvider } from "@mui/material"
import theme from "./theme";
import SideDrawer from "./SideDrawer";

export default function Message(){
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
            <h1>Message</h1>
        </Box>
        </Box>
        </ThemeProvider>
        </Box>
        
    )
}