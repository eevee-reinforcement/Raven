import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import UserImage from './UserImage';

const RoomEntry = () => {
  const placeholderImg =
    'https://img.freepik.com/free-vector/festive-calendar-event-holiday-celebration-party-work-schedule-planning-project-management-deadline-idea-office-managers-excited-colleagues_335657-1610.jpg';
  const [img, setImg] = useState(placeholderImg);
  const placeholderRoomHost = 'Placeholder Room Host';
  const [host, setHost] = useState(placeholderRoomHost);

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
          aria-label="room-entry-box"
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
            marginBottom: 2,
          }}
          noValidate
          autoComplete="off"
        >
          <Typography
            aria-label="room-entry-header"
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
            Enter Room
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar alt="Room Image" src={img} sx={{ width: 80, height: 80 }}></Avatar>
            <Box>
              <Typography
                aria-label="room-entry-header"
                variant="subtitle1"
                gutterBottom
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  maxWidth: '100%',
                  gap: 1,
                  overflowY: 'auto',
                  overflowX: 'hidden',
                }}
              >
                Room Name
              </Typography>
              <Typography
                aria-label="room-entry-header"
                variant="subtitle1"
                gutterBottom
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  maxWidth: '100%',
                  gap: 1,
                  overflowY: 'auto',
                  overflowX: 'hidden',
                }}
              >
                Hosted by: {host}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          component="form"
          aria-label="room-entry-box"
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
            marginBottom: 2,
          }}
          noValidate
          autoComplete="off"
        >
          <Typography
            aria-label="room-entry-header"
            variant="h6"
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
            How you will appear in the room
          </Typography>
          <TextField
            fullWidth
            label="Username"
            defaultValue="SAMPLE-USERNAME"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
          <Typography
            aria-label="room-entry-header"
            variant="subtitle1"
            gutterBottom
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              maxWidth: '100%',
              gap: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              marginTop: 2,
            }}
          >
            Profile picture
          </Typography>
          <UserImage></UserImage>
        </Box>
        <Box
          component="form"
          aria-label="room-entry-box"
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
          <TextField
            fullWidth
            placeholder="Enter room code..."
            variant="outlined"
          />
          <Button fullWidth sx={{ height: 56 }} variant="contained">
            ENTER ROOM
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default RoomEntry;
