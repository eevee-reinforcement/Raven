import express from 'express';
import RoomsController from '../controllers/roomsController.js';
import MessagesController from '../controllers/messagesController.js';

const router = express.Router();

// Room Routes under /entry
router.post('/api/entry/create-room', RoomsController.createRoom); // Create a room
router.post('/api/entry/join-room', RoomsController.joinRoom);     // Join a room

// Message Routes using the room name
router.post('/api/:room_name/message', MessagesController.postMessage); // Post a message
router.get('/api/:room_name/messages', MessagesController.getMessages); // Get messages for a room

export default router;