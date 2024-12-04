import express from 'express';
import ManagerController from '../controllers/manager_controller.js';


const router = express.Router();
// const { UserController } = require('../controllers/user_controller');
// const { EventsController } = require('../controllers/events_controller');

router.post('/signin', ManagerController.signIn);
router.post('/register', ManagerController.registerManager);
router.post('/reset-password', ManagerController.resetPassword);

export default router; 