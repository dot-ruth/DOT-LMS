import { Box } from '@mui/material'
import React from 'react'
import ThemeProvider from '@mui/material'
import theme from '../theme'
import StudentSideDrawer from './StudentSideDrawer'

function StudentClassCalander() {
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
            <h1>Class Calander</h1>
        </Box>
        </Box>
        </ThemeProvider>
    </Box>
  )
}

export default StudentClassCalander
