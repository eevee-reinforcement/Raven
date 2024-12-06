import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  Typography,
  Container,
} from '@mui/material';
import axios from 'axios';

// TODO: Join Room's variable is now uniquely called 'username' and is not shared with Create Room
// TODO: Join Room now needs its own piece of state called 'username'
// TODO: 'room code' has a similar issue: back end expects 'password'

const AuthPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState({
    host: '',
    name: '',
    roomCode: '',
  });
  const [inputValid, setInputValid] = useState(false);
  const [hostValid, sethostValid] = useState(false);
  const [nameValid, setnameValid] = useState(false);

  const handleTabChange = (_, newValue) => {
    setTabIndex(newValue);
    setFormData({
      host: '',
      name: '',
    });
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;

    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [field]: value };

      const hostValid =
        updatedFormData.host &&
        updatedFormData.host.length > 2 &&
        updatedFormData.host.length < 17;

      const nameValid =
        updatedFormData.name &&
        updatedFormData.name.length > 2 &&
        updatedFormData.name.length < 17;

      sethostValid(hostValid);
      setnameValid(nameValid);
      setInputValid(hostValid && nameValid);

      return updatedFormData;
    });
  };

  /**
   *
   * before user clicks CREATE ROOM:
   * input validation on Room Name: a-z, A-Z, 0-9 only???
   * character limits (min and max)
   * check for null
   *
   * CREATE ROOM:
   * check if host is taken
   * check if room name is taken
   *
   */

  const handleSubmit = async (e) => {
    e.preventDefault();

    let endpoint;
    let payload;

    switch (tabIndex) {
      case 0: // Create Room
        // TODO: fix this endpoint
        endpoint = '/api/entry/create-room';
        payload = {
          host: formData.host,
          name: formData.name,
        };
        break;
      case 1: // Join Room
        // TODO: fix this endpoint
        endpoint = '/api/auth/register';
        payload = {
          username: formData.username,
          name: formData.name,
          roomCode: formData.roomCode,
        };
        break;
      default:
        return;
    }

    try {
      const response = await axios.post(endpoint, payload);
      console.log('Response:', response.data);
      alert(response.data.message); // Optional: Display response message
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('An error occurred. Please try again.');
    }
  };

  const renderForm = () => {
    switch (tabIndex) {
      case 0:
        return (
          <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
            <TextField
              label="host"
              value={formData.host}
              onChange={(e) => handleInputChange(e, 'host')}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Room name"
              value={formData.name}
              onChange={(e) => handleInputChange(e, 'name')}
              fullWidth
              margin="normal"
              required
            />
            <Button disabled={!inputValid} type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Create Room
            </Button>
          </Box>
        );
      case 1:
        return (
          <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
            <TextField
              label="Username"
              value={formData.username}
              onChange={(e) => handleInputChange(e, 'username')}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Room name"
              value={formData.name}
              onChange={(e) => handleInputChange(e, 'name')}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Room code"
              value={formData.roomCode}
              onChange={(e) => handleInputChange(e, 'roomCode')}
              type="password"
              fullWidth
              margin="normal"
              required
            />
            <Button
              disabled={!inputValid}
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
            >
              Join Room
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" textAlign="center" sx={{ mb: 2 }}>
        Raven
      </Typography>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Create Room" />
        <Tab label="Join Room" />
      </Tabs>
      {renderForm()}
    </Container>
  );
};

export default AuthPage;
