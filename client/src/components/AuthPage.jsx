import React, { useState } from 'react';
import { Tabs, Tab, Box, TextField, Button, Typography, Container } from '@mui/material';
import axios from 'axios';

const AuthPage = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        newPassword: '',
    });

    const handleTabChange = (_, newValue) => {
        setTabIndex(newValue);
        setFormData({
            username: '',
            password: '',
            email: '',
            newPassword: '',
        });
    };

    const handleInputChange = (e, field) => {
        const value = e.target.value;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let endpoint;
        let payload;

        switch (tabIndex) {
            case 0: // Sign In
                endpoint = '/api/auth/signin';
                payload = {
                    username: formData.username,
                    password: formData.password,
                };
                break;
            case 1: // Register
                endpoint = '/api/auth/register';
                payload = {
                    email: formData.email,
                    username: formData.username,
                    password: formData.password,
                };
                break;
            case 2: // Forgot Password
                endpoint = '/api/auth/reset-password';
                payload = {
                    email: formData.email,
                    newPassword: formData.newPassword,
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
                            label="Password"
                            value={formData.password}
                            onChange={(e) => handleInputChange(e, 'password')}
                            type="password"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                            Sign In
                        </Button>
                    </Box>
                );
            case 1:
                return (
                    <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            value={formData.email}
                            onChange={(e) => handleInputChange(e, 'email')}
                            type="email"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Username"
                            value={formData.username}
                            onChange={(e) => handleInputChange(e, 'username')}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Password"
                            value={formData.password}
                            onChange={(e) => handleInputChange(e, 'password')}
                            type="password"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                            Register
                        </Button>
                    </Box>
                );
            case 2:
                return (
                    <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            value={formData.email}
                            onChange={(e) => handleInputChange(e, 'email')}
                            type="email"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="New Password"
                            value={formData.newPassword}
                            onChange={(e) => handleInputChange(e, 'newPassword')}
                            type="password"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                            Reset Password
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
                Event Manager
            </Typography>
            <Tabs value={tabIndex} onChange={handleTabChange} centered>
                <Tab label="Sign In" />
                <Tab label="Register" />
                <Tab label="Forgot Password" />
            </Tabs>
            {renderForm()}
        </Container>
    );
};

export default AuthPage;
