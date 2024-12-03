import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
};

const Message = (props) => {
  return (
    <Box
      aria-label="message-box"
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        padding: '8px',
        borderRadius: '8px',
        width: 500,
        maxWidth: '100%',
        gap: 1,
      }}
    >
      <Avatar {...stringAvatar(props.username)} />
      <Box
        aria-label="message-body-box"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 500,
          maxWidth: '100%',
          paddingRight: '28px',
          boxSizing: 'border-box',
        }}
      >
        <Box
          aria-label="message-header-box"
          sx={{
            display: 'flex',
            width: 500,
            maxWidth: '100%',
            gap: 1,
          }}
        >
          <Typography
            aria-label="message-username"
            variant="body2"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            {props.username}
          </Typography>
          <Typography
            aria-label="message-timestamp"
            variant="body2"
            gutterBottom
          >
            8:39 PM
          </Typography>
        </Box>
        <Typography
          aria-label="message-body"
          variant="body1"
          gutterBottom
          sx={{
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            paddingRight: '18px',
            boxSizing: 'border-box',
          }}
        >
          {props.body}
        </Typography>
      </Box>
    </Box>
  );
};

export default Message;
