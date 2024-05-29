const express = require('express');
const authMiddleware = require('../middleware/auth');
const Message = require('../models/Message');
const router = express.Router();

// Middleware for authentication
router.use(authMiddleware);

// Fetch chat history
router.get('/:room', async (req, res) => {
    try {
        const messages = await Message.find({ room: req.params.room }).populate('user', 'username');
        res.json(messages);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Send message
router.post('/:room', async (req, res) => {
    try {
        const message = new Message({
            room: req.params.room,
            user: req.user.id,
            message: req.body.message
        });
        await message.save();
        res.json(message);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
