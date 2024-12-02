import React from 'react';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';

const SendButton = ({ handleSubmit }) => {
  return (
    <Fab
      variant="contained"
      color="primary"
      aria-label="send"
      onClick={handleSubmit}
      size="small"
      sx={{
        position: 'absolute',
        right: '8px',
        bottom: '8px',
        height: 'fit-content',
        marginLeft: '8px',
        borderRadius: '8px',
        padding: '8px 16px',
      }}
    >
      <SendIcon />
    </Fab>
  );
};

export default SendButton;
