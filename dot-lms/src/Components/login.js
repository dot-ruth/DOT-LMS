import React from "react";
import theme from "./theme";
import {Button, Typography} from "@mui/material";
import  {ThemeProvider} from "@mui/material";
import {FormControl} from "@mui/material";
import {InputLabel} from "@mui/material";
import {OutlinedInput} from "@mui/material";
import {InputAdornment} from "@mui/material";
import {IconButton} from "@mui/material";
import {AppBar} from "@mui/material";
import {Visibility} from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import {Link} from "react-router-dom";

function Login(){
    const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

return(
    <div >
<ThemeProvider theme={theme}>
        <div className="d-flex flex-column justify-content-center align-items-center mx-auto">
            <AppBar position="static" sx={{height:'5ch',mb: 10}}>
                <Typography sx={{ml:5,fontSize:25,fontWeight:'bold'}}>DOT</Typography>
                </AppBar>
            
<Typography sx={{m:2,fontSize:30,fontWeight:'bold'}}>Welcome to DOT Learning Management System</Typography>
<Typography sx={{m:2,fontSize:30,fontWeight:'bold'}}>Login</Typography>

<FormControl sx={{ m:2, width:'50ch'}} >
    <InputLabel color="primary">User ID</InputLabel>
    <OutlinedInput type="text" color="primary" label="User ID" variant="outlined"/>
</FormControl>
<FormControl sx={{ m:2, width: '50ch' }} variant="outlined">
          <InputLabel color="primary" >Password</InputLabel>
          <OutlinedInput
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            color="primary"
            label="Password"
          />
        </FormControl>
        <Link to='/Dashboard'>
        <Button color="primary" variant="contained" sx={{m:1, width:'20ch'}}>Login</Button>
        </Link>
        </div>
        </ThemeProvider>
    </div>
    
)
}

export default Login;