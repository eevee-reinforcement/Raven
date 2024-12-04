import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SendButton from './SendButton.jsx';

/**
 * Text input input component, used to type and send a new Message.
 * @param {Object} props - Properties required to construct a TextInput.
 */
const TextInput = (props) => {
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
        aria-label="text-input-box"
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px',
          borderRadius: '8px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          width: 500,
          maxWidth: '100%',
          gap: 1,
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          fullWidth
          onChange={handleChange}
          id="outlined-multiline-flexible"
          label={props.roomName}
          multiline
          maxRows={4}
          sx={{
            flexGrow: 1,
            borderRadius: '8px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            },
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <SendButton handleSubmit={handleSubmit}></SendButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    </div>
  );
};

export default TextInput;
