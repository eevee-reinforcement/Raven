const express = require('express');
const router = express.Router();

const { ManagerController } = require('../controllers/manager_controller');
// const { UserController } = require('../controllers/user_controller');
// const { EventsController } = require('../controllers/events_controller');

router.post('/signin', ManagerController.signIn);

// Route for registration
router.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const result = await ManagerController.registerManager({ email, username, password });
        res.status(201).json(result);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ error: error.message });
    }
});

router.post('/reset-password', ManagerController.resetPassword);

module.exports = router;