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
import interactionPlugin from "@fullcalendar/interaction";
import { v4 as uuid } from "uuid";
import moment from 'moment';
import axios from 'axios'

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

  const teacher_id = sessionStorage.getItem('teacher_id').replaceAll('"','')

  function create_event_Data(event_title,event_id,event_start,event_end) {
    return { event_title,event_id,event_start,event_end };
  }

  const [eventData, setEventData] = useState([]);

  const [events,setEvents] = useState([]);

  let EventArray = []

  let EventDisplayArray = []

  const handleEvent = () => {
    axios.get("http://127.0.0.1:8000/api/Events/Teacher/" + teacher_id )
    .then((response)=>{
      for(let i = 0 ; i<response.data.event.length;i++){
        EventArray.push(create_event_Data(response.data.event[i].event_title,response.data.event[i].event_id,response.data.event[i].event_start,response.data.event[i].event_end));
        
      }
      for(let i = 0;i<eventData.length;i++){
        EventDisplayArray.push({
          start:eventData[i].event_start,
          end:eventData[i].event_end,
          title: eventData[i].event_title,
          id: eventData[i].event_id,
        })
      }
      console.log(EventDisplayArray)
      setEvents(EventDisplayArray)
      setEventData(EventArray)
})
  }


  const EventItem = ({ info }) => {
    const { event } = info;
    return (
      <div>
        <p>{event.title}</p>
      </div>
    );
  };

  
  

  return (
    <Box>
        <ThemeProvider theme={theme}>
        <TeacherSideDrawer/> 
        {
            React.useEffect(()=>{
              handleEvent()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
      }
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
        select={handleEvent}
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
                <Typography sx={{fontSize:100,fontWeight:'bold',mb:-5,color:'white'}} >{moment().format('D')}</Typography>
                <Typography sx={{fontSize:25,fontWeight:'bold',color:'white'}} >{moment().format('dddd')}</Typography>
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
                
                </Box>
                <Box sx={{
                  width:'250px'}}>
                    
                    { console.log(events)}
                    {eventData.map((event,index)=>(
                      <Box>
                      <Box sx={{display:'flex',justifyContent:'space-between'}}>
                  <ListItem>{event.event_title}</ListItem>
                  <ListItem>{moment(event.event_end).format('DD/MM/YYYY')}</ListItem>
                  </Box>
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