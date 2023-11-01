import { Box,Input,ThemeProvider } from "@mui/material"
import { useEffect, useState,useRef } from 'react';
import theme from "./theme";
import StudentSideDrawer from "./StudentComponents/StudentSideDrawer";
import TeacherSideDrawer from "./TeacherComponents/TeacherSideDrawer";
import {Typography }from '@mui/material';
import {FormControl} from '@mui/material';
import {InputLabel} from '@mui/material';
import {OutlinedInput }from '@mui/material';
import {Button} from '@mui/material';
import Talk from 'talkjs';
import CreateIcon from '@mui/icons-material/Create';
import { Avatar } from '@mui/material';





export default function Message(){

    const role = localStorage.getItem('role');
    const student = '"student"';
    const first_name = sessionStorage.getItem('First_Name').replaceAll('"','')
    const user_id = sessionStorage.getItem('teacher_id').replaceAll('"','')

    const [talkLoaded, markTalkLoaded] = useState(false);

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));

    if (talkLoaded) {
      const currentUser = new Talk.User({
        id: '1',
        name: 'Henry Mill',
        email: 'henrymill@example.com',
        photoUrl: 'henry.jpeg',
        welcomeMessage: 'Hello!',
        role: 'default',
      });

      const otherUser1 = new Talk.User({
        id: '2',
        name: 'Jessica Wells',
        email: 'jessicawells@example.com',
        photoUrl: 'jessica.jpeg',
        welcomeMessage: 'Hello!',
        role: 'default',
      });

      const otherUser2 = new Talk.User({
        id: '3',
        name: 'Jessica ',
        email: 'jessica@example.com',
        photoUrl: 'jessica.jpeg',
        welcomeMessage: 'Hello!',
        role: 'default',
      });

      const session = new Talk.Session({
        appId: 'tPgn5Ays',
        me: currentUser,
      });

      const conversationId1 = Talk.oneOnOneId(currentUser, otherUser1);
      const conversation1 = session.getOrCreateConversation(conversationId1);
      conversation1.setParticipant(currentUser);
      conversation1.setParticipant(otherUser1);

      const converstionId2 = Talk.oneOnOneId(currentUser,otherUser2)
      const conversation2 = session.getOrCreateConversation(converstionId2)
      conversation2.setParticipant(currentUser)
      conversation2.setParticipant(otherUser2)

      const inbox = session.createInbox({ });
      inbox.setFeedFilter({})
      inbox.mount(document.getElementById("talkjs-container"));

      

      // const chatbox = session.createChatbox();
      // chatbox.select(conversation1);
      // chatbox.mount(chatboxEl.current);

      return () => session.destroy();
    }
  }, [talkLoaded]);

    return (
        <Box>
            <ThemeProvider theme={theme}>
                {role === student?<StudentSideDrawer/> :<TeacherSideDrawer/> }
        
            <Box sx={{display:'flex',m:2}}>

            <Box id="talkjs-container" 
            sx={{
              width: 1100,
              marginLeft:10,
               height: 510 }}>
</Box>

<Avatar sx={{bgcolor:'#68cca9',alignSelf:'flex-end'}} ><CreateIcon/></Avatar>
</Box>

        </ThemeProvider>
        </Box>
        
    )
}

