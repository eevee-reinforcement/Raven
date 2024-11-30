import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendButton from './SendButton.jsx';

const TextInput = () => {
  const [userInput, setUserInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('userInput', userInput);
    // add functionality to send this into the back end
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div>
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          fullWidth
          onChange={handleChange}
          id="outlined-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
        />
        <SendButton handleSubmit={handleSubmit}></SendButton>
      </Box>
    </div>
  );
};

export default TextInput;
