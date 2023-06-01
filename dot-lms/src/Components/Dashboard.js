import SideDrawer from "./SideDrawer";
import Courses from "./Courses";
import Profile from "./profile";
import { Box } from "@mui/material";
export default function Dashboard(){
    return (
        <Box sx={{display:'flex'}}>
        <SideDrawer/> 
        <Box component="main" sx={{flexGrow:1,p:3}}>
        <Profile/>
        </Box>
        {/* <Courses/> */}
        </Box>
    ) 
         
}