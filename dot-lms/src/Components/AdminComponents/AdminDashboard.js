import theme from "../theme";
import { Box, ThemeProvider } from "@mui/material";
import AdminSideDrawer from "./AdminSideDrawer";
import AdminHome from "./AdminHome";
export default function AdminDashboard(){
    return (
        
        <Box>
            <ThemeProvider theme={theme}>
        <AdminSideDrawer/>
        <Box 
        sx={{ml: `calc(${theme.spacing(7)} + 15px)`,
        display:'flex', 
        justifyContent:'space-between',
        height:'100vh',
        overflowY:'hidden',
        }}>
            <Box sx={{mt:1}}>
        <AdminHome/>
        </Box>
        
        </Box>
        </ThemeProvider>
        </Box>
    ) 
         
}