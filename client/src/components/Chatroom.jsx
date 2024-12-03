import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import TextInput from './TextInput.jsx';
import Messages from './Messages.jsx';
import database from '../database.json';
import Typography from '@mui/material/Typography';

// Retrieve chatroom name from mock database
const roomName = database.chatrooms['1'];

const Chatroom = () => {
  return (
    <div>
      <Typography
        aria-label="chatroom-name"
        variant="h4"
        gutterBottom
        sx={{
          display: 'flex',
          // flexDirection: 'column',
          alignItems: 'center',
          padding: '12px',
          // borderRadius: '8px',
          // boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          width: 500,
          maxWidth: '100%',
          gap: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {roomName.name}
      </Typography>
      <Messages></Messages>
      <TextInput roomName={`Message ${roomName.name}`}></TextInput>
    </div>
  );
};

export default Chatroom;
