import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import TimePickerForm from './TimePickerForm';
import DatePickerForm from './DatePickerForm';
import RoomImage from './RoomImage';

const RoomSettings = () => {
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="form"
          aria-label="room-settings-box"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '8px',
            borderRadius: '8px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            width: 500,
            maxWidth: '100%',
            gap: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
          noValidate
          autoComplete="off"
        >
          <Typography
            aria-label="chatroom-name"
            variant="h4"
            gutterBottom
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              maxWidth: '100%',
              gap: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            Room Settings
          </Typography>
          <TextField
            fullWidth
            label="Room Name"
            defaultValue="SAMPLE-ROOM-NAME"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            sx={{
              marginBottom: 2,
            }}
          />
          <TextField
            fullWidth
            label="Room Code"
            defaultValue="SAMPLE-ROOM-CODE"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            sx={{
              marginBottom: 2,
            }}
          />
          <Typography
            aria-label="image"
            variant="h6"
            // gutterBottom
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              maxWidth: '100%',
              gap: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            Room Image
          </Typography>
          <RoomImage></RoomImage>
          <Box
            sx={{
              marginBottom: 2,
            }}
          >
            <DatePickerForm label="Start date: " />
            <TimePickerForm label="Start time: " />
            <DatePickerForm label="End date: " />
            <TimePickerForm label="End time: " />
          </Box>
          <Button variant="contained">Save Changes</Button>
        </Box>
      </Box>
    </div>
  );
};

export default RoomSettings;
