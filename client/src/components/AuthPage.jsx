import React, { useState } from 'react';
import { Tabs, Tab, Box, TextField, Button, Typography, Container } from '@mui/material';

const AuthPage = () => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const renderForm = () => {
        switch (tabIndex) {
            case 0:
                return (
                    <Box component="form" sx={{ mt: 3 }}>
                        <TextField label="Username" fullWidth margin="normal" required />
                        <TextField label="Password" type="password" fullWidth margin="normal" required />
                        <Button variant="contained" fullWidth sx={{ mt: 2 }}>Sign In</Button>
                    </Box>
                );
            case 1:
                return (
                    <Box component="form" sx={{ mt: 3 }}>
                        <TextField label="Email" type="email" fullWidth margin="normal" required />
                        <TextField label="Username" fullWidth margin="normal" required />
                        <TextField label="Password" type="password" fullWidth margin="normal" required />
                        <Button variant="contained" fullWidth sx={{ mt: 2 }}>Register</Button>
                    </Box>
                );
            case 2:
                return (
                    <Box component="form" sx={{ mt: 3 }}>
                        <TextField label="Email" type="email" fullWidth margin="normal" required />
                        <TextField label="New Password" type="password" fullWidth margin="normal" required />
                        <Button variant="contained" fullWidth sx={{ mt: 2 }}>Reset Password</Button>
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
