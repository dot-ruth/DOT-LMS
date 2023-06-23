import { Box,ThemeProvider,Typography } from "@mui/material"
import theme from "./theme";
import {Card,CardActionArea,CardMedia,CardContent,CardActions,Button} from "@mui/material";
import { Link } from "react-router-dom";
import TeacherSideDrawer from "./TeacherSideDrawer";

export default function TeacherMockExam(){
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
            <Link>
          <Typography  variant="h6" component="div" sx={{ color: '#68cca9'}}>
           Exam Title
          </Typography>
          </Link>
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
