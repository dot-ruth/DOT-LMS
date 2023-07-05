import { Box,ThemeProvider,Typography,Card,CardActionArea,CardMedia,CardContent,CardActions,Button } from "@mui/material"
import theme from "../theme";
import StudentSideDrawer from "./StudentSideDrawer";

export default function StudentTutorialVideo(){
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
            <Typography variant="h5" noWrap component="div"
        sx={{
            fontWeight:'bold',
            m:1
        }}
        >Tutorial Videos</Typography>


            <Card 
    sx={{ 
        maxWidth: 500,
        width:400,
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
          alt="Youtube Thumbnail"
        />
        <CardContent >
          <Typography  variant="h6" component="div" sx={{ color: '#68cca9'}}>
           Video Title
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box sx={{display:'flex',justifyContent:'flex-end'}}>
      <CardActions>
        <Button size="small" color="primary" variant="contained" sx={{ml:'auto'}}>
          Video Tpoic
        </Button>
      </CardActions>
      <CardActions>
        <Button size="small" color="primary" variant="contained" sx={{ml:'auto'}}>
          Duration
        </Button>
      </CardActions>
      </Box>
    </Card>
        </Box>
        </Box>
        </ThemeProvider>
        </Box>
        
    )
}
