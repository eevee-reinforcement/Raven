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

    const handleInputChange = (e) => {
        const field = e.target.dataset.field; // Use data-field attribute
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
                            data-field="username"
                            label="Username"
                            value={formData.username}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            data-field="password"
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
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
                            data-field="email"
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            data-field="username"
                            label="Username"
                            value={formData.username}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            data-field="password"
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
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
                            data-field="email"
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            data-field="newPassword"
                            label="New Password"
                            type="password"
                            value={formData.newPassword}
                            onChange={handleInputChange}
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
