const express = require('express');
const router = express.Router();

const { ManagerController } = require('../controllers/manager_controller');
// const { UserController } = require('../controllers/user_controller');
// const { EventsController } = require('../controllers/events_controller');

router.post('/signin', ManagerController.signIn);
router.post('/register', ManagerController.registerManager);
router.post('/reset-password', ManagerController.resetPassword);

module.exports = router;