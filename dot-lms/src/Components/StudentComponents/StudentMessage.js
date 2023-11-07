import React from 'react'
import { Box,Divider,Input,ThemeProvider } from "@mui/material"
import { useEffect, useState,useRef } from 'react';
import theme from "../theme";
import StudentSideDrawer from './StudentSideDrawer';
import Talk from 'talkjs';
import CreateIcon from '@mui/icons-material/Create';
import { Avatar } from '@mui/material';
import Modal from '@mui/material/Modal';
import axios from "axios";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height:400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY:'scroll'
};

export default function StudentMessage() {
    const [UserArray,setUserArray] =useState([])
    const role = localStorage.getItem('role');
    const student = '"student"';
    const first_name = sessionStorage.getItem('First_Name').replaceAll('"','')
    const last_name = sessionStorage.getItem("Last_Name").replaceAll('"','')
    const user_id = sessionStorage.getItem('id').replaceAll('"','')
    const [open_Modal, setOpen_Modal] = useState(false);
    const [talkLoaded, markTalkLoaded] = useState(false);

    const handleopen_Modal = () => setOpen_Modal(true);

    const handleClose_Modal = () => setOpen_Modal(false);

    
    

    const getUserData =()=>{
      axios.get("http://127.0.0.1:8000/api/Users" )
        .then((response)=>{
        
        setUserArray(response.data[0])
    })
    }

    
const SendMessage = (otherUser_id,otherUser_name)=>{


    if (talkLoaded) {
      const me = new Talk.User({
        id: user_id,
        name: first_name + " " + last_name,
        role: 'default',
      });
  
      const other_User = new Talk.User({
        id: otherUser_id,
        name: otherUser_name,
        role: 'default',
      });
  
      const session = new Talk.Session({
        appId: 'tPgn5Ays',
        me: me,
      });

      const conversationId1 = Talk.oneOnOneId(me, other_User);
      const conversation1 = session.getOrCreateConversation(conversationId1);
      conversation1.setParticipant(me);
      conversation1.setParticipant(other_User);
     // session.sendMessage(conversationId1, "Hello!");

     const inbox = session.createInbox();
     inbox.select(conversation1);
     inbox.mount(document.getElementById("talkjs-container"));

      console.log(session)
      setOpen_Modal(false)
    }

}

useEffect(() => {
  Talk.ready.then(() => markTalkLoaded(true));

  if (talkLoaded) {
    const me = new Talk.User({
      id: user_id,
      name: first_name + " " + last_name,
      role: 'default',
    });

    const session = new Talk.Session({
      appId: 'tPgn5Ays',
      me: me,
    });

    const inbox = session.createInbox({ });
    inbox.mount(document.getElementById("talkjs-container"));

    return () => session.destroy();
  }
}, [talkLoaded,first_name,last_name,user_id]);


    return (
        <Box>
          {
            useEffect(()=>{
              getUserData ()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
      }


            <ThemeProvider theme={theme}>
                <StudentSideDrawer/>
        
            <Box sx={{display:'flex',m:2}}>

            <Box 
            id="talkjs-container" 
            sx={{
              width: 1100,
              marginLeft:10,
               height: 510 }}>
</Box>

<Avatar sx={{bgcolor:'#68cca9',alignSelf:'flex-end'}} onClick={()=>handleopen_Modal()} ><CreateIcon/></Avatar>

<Modal

      open={open_Modal}
      onClose={handleClose_Modal}
    >
      {open_Modal?
      <Box sx={style}>
      {UserArray.map((user) => 
          (
            <Box>
            
           <Box sx={{m:1}} 
           onClick={()=>
           {
           SendMessage(user[1],user[0])
           }}>{user[0]}</Box> 
            <Divider/>
            </Box>
            
           
          ))}
    </Box>:
    <Box></Box>
    }
    </Modal>
</Box>

        </ThemeProvider>
        </Box>
        
    )
}
