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

const AuthPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState({
    username: '',
    roomName: '',
    roomCode: '',
  });
  const [inputValid, setInputValid] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);
  const [roomNameValid, setRoomNameValid] = useState(false);

  const handleTabChange = (_, newValue) => {
    setTabIndex(newValue);
    setFormData({
      username: '',
      roomName: '',
    });
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;

    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [field]: value };

      const usernameValid =
        updatedFormData.username &&
        updatedFormData.username.length > 2 &&
        updatedFormData.username.length < 17;

      const roomNameValid =
        updatedFormData.roomName &&
        updatedFormData.roomName.length > 2 &&
        updatedFormData.roomName.length < 17;

      setUsernameValid(usernameValid);
      setRoomNameValid(roomNameValid);
      setInputValid(usernameValid && roomNameValid);

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
   * check if username is taken
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
          username: formData.username,
          roomName: formData.roomName,
        };
        break;
      case 1: // Join Room
        // TODO: fix this endpoint
        endpoint = '/api/auth/register';
        payload = {
          username: formData.username,
          roomName: formData.roomName,
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
              label="Username"
              value={formData.username}
              onChange={(e) => handleInputChange(e, 'username')}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Room name"
              value={formData.roomName}
              onChange={(e) => handleInputChange(e, 'roomName')}
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
              value={formData.roomName}
              onChange={(e) => handleInputChange(e, 'roomName')}
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
