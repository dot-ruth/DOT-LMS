import { Box, List, ListItem,Typography } from '@mui/material'
import React from 'react'
import { ThemeProvider } from '@mui/material'
import { useState} from "react";
import theme from '../theme'
import TeacherSideDrawer from './TeacherSideDrawer'
import 'react-calendar/dist/Calendar.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import styled from 'styled-components';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import interactionPlugin from "@fullcalendar/interaction";
import { v4 as uuid } from "uuid";
import moment from 'moment';
import Modal from '@mui/material/Modal';
import AddEvent from './AddEvent';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CalendarContainer = styled.div`
  /* ~~~ container styles ~~~ */
  width: 900px;
  margin: auto;
  margin-top: 20px;
  padding: 10px;
  border-radius: 3px;
  --fc-button-bg-color: #68cca9;
  --fc-neutral-text-color: black;

  .fc-daygrid-day-number {
    color:black;
    text-decoration: none;
  }

  
`;

export default function TeacherClassCalander() {

  const [events, setEvents] = useState([]);
  const [SelectedDate,setSelectedDate] = useState(moment())

  const handleSelect = (info) => {
    const { start, end } = info;
    const eventNamePrompt = prompt("Enter, event name");
    const calendarRef = React.createRef();
    const view = calendarRef.current.getView();
    const selectedDate = view.intervalStart;
    setSelectedDate(selectedDate);
    if (eventNamePrompt) {
      setEvents([
        ...events,
        {
          start,
          end,
          title: eventNamePrompt,
          id: uuid(),
        },
      ]);
    }
  };

  const EventItem = ({ info }) => {
    const { event } = info;
    return (
      <div>
        <p>{event.title}</p>
      </div>
    );
  };

  const [open_add,setopen_add] = React.useState(false)

  const handleOpen_add = () => setopen_add(true)

  const handleClose_add = () => setopen_add(false)
  
  

  return (
    <Box>
        <ThemeProvider theme={theme}>
        <TeacherSideDrawer/> 
        <Box 
        sx={{ml: `calc(${theme.spacing(7)} + 15px)`,
        overflow:'hidden !important',
        display:'flex',
              justifyContent:'center',
              alignItems:'center',
        }}>
            <Box sx={{
              display:'flex',
            
            }}>
              
<CalendarContainer>
<FullCalendar
        plugins={[ dayGridPlugin,interactionPlugin ]}
        initialView="dayGridMonth"
        events={events}
        select={handleSelect}
        headerToolbar={{
          start:'prevYear prev',
          center:'title',
          end:'next nextYear',
        }}
        eventContent={(info) => <EventItem info={info} />}

      />
      </CalendarContainer>

      <Box  sx={{
                width:'300px',
                backgroundColor:'#3aa680',
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
              }}>
                <Typography sx={{fontSize:100,fontWeight:'bold',mb:-5,color:'white'}} >{moment(SelectedDate).format('D')}</Typography>
                <Typography sx={{fontSize:25,fontWeight:'bold',color:'white'}} >{moment(SelectedDate).format('dddd')}</Typography>
                <Box sx={{
                  alignSelf:'flex-start',
                  ml:1
                  }}>
                <List style={{
                  fontSize:15,
                  fontWeight:'bold',
                  color:"white",
                  }}>
                    <Box sx={{
                  display:'flex',
                  width:'250px',
                  justifyContent:'space-between'
                  }}>
                    <Typography sx={{ml:1}}>Events</Typography>
                <AddCircleOutlineRoundedIcon color="WhiteTheme" onClick={()=>handleOpen_add()} />
                <Modal
        open={open_add}
        onClose={handleClose_add}
      >
        {open_add?
        <Box sx={style}>
        <AddEvent/>
      </Box>:
      <Box></Box>
      }
      </Modal>
                </Box>
                <Box sx={{
                  width:'250px'}}>
                    {events.map((event,index)=>(
                      <Box sx={{display:'flex',justifyContent:'space-between'}}>
                  <ListItem>{event.title}</ListItem>
                  <ListItem>{moment(event.end).format('DD/MM/YYYY')}</ListItem>
                  </Box>
                    ))}
                  </Box>
                </List>
                </Box>
                
              </Box>

        </Box>
        </Box>
        </ThemeProvider>
    </Box>
  )
}