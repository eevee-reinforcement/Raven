import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const UserImage = () => {
  const placeholderImg =
    'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg';
  const [img, setImg] = useState("");

  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 2
    }}>
      <img src={img}></img>
      <Button variant="outlined" sx={{marginTop: 4,}}>Upload Image</Button>
    </Box>
  );
};

export default UserImage;
