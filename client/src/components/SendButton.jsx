import React from 'react';
import Button from '@mui/material/Button';

const SendButton = ({ handleSubmit }) => {
  return (
    <Button variant="contained" onClick={handleSubmit}>
      Send
    </Button>
  );
};

export default SendButton;
