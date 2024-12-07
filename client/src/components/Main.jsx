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
    room_password: '',
    username: '',
    room_name: '',
  });
  const [createInputValid, setCreateInputValid] = useState(false);
  const [joinInputValid, setJoinInputValid] = useState(false);
  const [hostValid, setHostValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);
  const [room_nameValid, setRoom_nameValid] = useState(false);
  const [room_passwordValid, setRoom_passwordValid] = useState(false);

  const handleTabChange = (_, newValue) => {
    setTabIndex(newValue);
    setFormData({
      host: '',
      name: '',
      room_password: '',
      username: '',
      room_name: '',
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
      
      const usernameValid =
        updatedFormData.username &&
        updatedFormData.username.length > 2 &&
        updatedFormData.username.length < 17;
      
      const room_nameValid =
        updatedFormData.room_name &&
        updatedFormData.room_name.length > 2 &&
        updatedFormData.room_name.length < 17;
      
      const room_passwordValid =
        updatedFormData.room_password &&
        updatedFormData.room_password.length === 6;

      setHostValid(hostValid);
      setNameValid(nameValid);
      setUsernameValid(usernameValid);
      setRoom_nameValid(room_nameValid);
      setRoom_passwordValid(room_passwordValid);
      setCreateInputValid(hostValid && nameValid);
      setJoinInputValid(usernameValid && room_nameValid && room_passwordValid);

      return updatedFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let endpoint;
    let payload;

    // determine which action to perform based on selected tab
    switch (tabIndex) {
      case 0: // Create Room
        endpoint = '/api/entry/create-room';
        payload = {
          host: formData.host,
          name: formData.name,
        };
        break;
      case 1: // Join Room
        endpoint = '/api/entry/join-room';
        payload = {
          username: formData.username,
          room_name: formData.room_name,
          room_password: formData.room_password,
        };
        break;
      default:
        return;
    }

    try {
      // make POST req to determined API endpoint with payload
      const response = await axios.post(endpoint, payload);

      // if req successful - log response and show alert
      console.log('Response:', response.data);
      alert(response.data.message || 'Success'); // Optional: Display response message
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
            <Button
              disabled={!createInputValid}
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
            >
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
              value={formData.room_name}
              onChange={(e) => handleInputChange(e, 'room_name')}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Room code"
              value={formData.room_password}
              onChange={(e) => handleInputChange(e, 'room_password')}
              type="password"
              fullWidth
              margin="normal"
              required
            />
            <Button
              disabled={!joinInputValid}
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
