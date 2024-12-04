import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const RoomImage = () => {
  const placeholderImg =
    'https://img.freepik.com/free-vector/festive-calendar-event-holiday-celebration-party-work-schedule-planning-project-management-deadline-idea-office-managers-excited-colleagues_335657-1610.jpg';
  const [img, setImg] = useState(placeholderImg);

  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 2
    }}>
      <img src={img}></img>
      <Button variant="outlined">Upload Image</Button>
    </Box>
  );
};

export default RoomImage;
