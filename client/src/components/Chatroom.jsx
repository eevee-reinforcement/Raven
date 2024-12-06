import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import TextInput from './TextInput.jsx';
import Messages from './Messages.jsx';
import database from '../database.json';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';

// Retrieve chatroom name from mock database
const roomName = database.chatrooms['1'];

const socket = io('http://localhost:8080');

// Helper function for development; creates a future timestamp in seconds based on number of days and hours.
const convertToTimestamp = (days, hours) => {
  // Calculate total milliseconds
  const milliseconds = (days * 24 + hours) * 60 * 60 * 1000;

  // Get current date
  const now = new Date();

  // Add the calculated milliseconds to the current timestamp
  const futureTimestamp = now.getTime() + milliseconds;

  return futureTimestamp;
};

// TODO: Retrieve actual timestamp data from DB and calcuate this correctly
const countdown = convertToTimestamp(1, 5); // 1 day and 5 hours from now

// Converts future timestamp to human readable days, hours, minutes, seconds.
// TODO: Make this a dynamic countdown on the page
function convertTimestamp(timestamp) {
  const date = timestamp;

  // Calculate the difference in milliseconds
  const diff = timestamp - new Date();

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

// const countdownMessage = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

const Chatroom = () => {
  const [countdownMessage, setCountdownMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const { days, hours, minutes, seconds } = convertTimestamp(countdown);
      setCountdownMessage(
        `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
      );
    }, 1000);

    return () => clearInterval(interval);
  });

  //listen for incoming messages when component mounts
  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), text: msg },
      ]); // prevMessages represents current state of messages array at the time of func invocation
    });

    // clean socket listener when component unmounts
    return () => {
      socket.off('chat message');
    };
  }, []);

  const handleSendMessage = (message) => {
    const sentAt = new Date().toISOString();
    const username = 'current_user'; // replace with dynamic username when available
    const roomId = '1'; // replace with dynamic room id when availabl e
    
    const newMessage = { username, room_id:roomId, message };

    // Display message on frontend
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      // send msg to server through websocket
     socket.emit('chat message', newMessage);

     // save the message to database via backend API
     const response = await fetch 
    }
    
  };

  return (
    <div>
      <Box
        aria-label="chatroom-header"
        sx={{
          display: 'flex',
          // alignItems: 'center',
          width: 900,
          maxWidth: '100%',
        }}
      >
        <Typography
          aria-label="chatroom-name"
          variant="h4"
          gutterBottom
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 12px 0px 12px',
            width: 500,
            maxWidth: '100%',
            gap: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          {roomName.name}
        </Typography>
        <Box
          sx={{
            '& > :not(style)': { m: 1 },
            // padding: '8px',
          }}
        >
          <Tooltip title="Create new event">
            <Fab size="small" color="primary" aria-label="add-chatroom">
              <AddIcon />
            </Fab>
          </Tooltip>
        </Box>
      </Box>

      <Box
        aria-label="countdown-box"
        sx={{
          display: 'flex',
          alignItems: 'center',
          // backgroundColor: 'lightgrey',
          padding: '8px',
          margin: '0px',
          width: '38%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          borderRadius: '8px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <TimerIcon
          sx={{
            padding: '0px 0px 0px 12px',
          }}
        ></TimerIcon>
        <Typography
          aria-label="countdown"
          variant="body1"
          gutterBottom
          sx={{
            padding: '4px 0px 0px 12px',
            width: 500,
            maxWidth: '100%',
          }}
        >
          {countdownMessage}
        </Typography>
      </Box>
      <Messages messages={messages} />
      <TextInput
        roomName={`Message ${roomName.name}`}
        onSendMessage={handleSendMessage}
      ></TextInput>
    </div>
  );
};

export default Chatroom;
