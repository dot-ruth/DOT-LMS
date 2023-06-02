import { Box,ThemeProvider,Typography } from "@mui/material"
import theme from "./theme";
import SideDrawer from "./SideDrawer";
import {Card,CardActionArea,CardMedia,CardContent,CardActions,Button} from "@mui/material";

export default function Quiz(){
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

            <Typography variant="h5" noWrap component="div"
        sx={{
            fontWeight:'bold',
            m:1
        }}
        >Mock Exams</Typography>


            <Card 
    sx={{ 
        maxWidth: 345,
        m:1,
        display:'flex', 
        flexDirection:'column',
        p:0.3,
        }} variant="outlined" color="#68cca9">
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image=" "
          alt="Exam Title's Img"
        />
        <CardContent >
          <Typography  variant="h6" component="div" sx={{ color: '#68cca9'}}>
           Exam Title
          </Typography>
          <Typography sx={{m:1}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Vestibulum eget orci diam. Sed porttitor nibh sit amet risus tempor, eu aliquam felis efficitur. 
          Etiam in auctor nisl. Suspendisse et felis quis est facilisis iaculis.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" variant="contained" sx={{ml:'auto'}}>
          Exam Topic
        </Button>
      </CardActions>
    </Card>
        
        </Box>
        </Box>
        </ThemeProvider>
        </Box>
        
    )
}