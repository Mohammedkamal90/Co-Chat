const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// New user Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ username, email, password: await bcrypt.hash(password, 10) });
        await user.save();

        const token = jwt.sign({ id: user._id }, 'secret');
        res.json({ token, user: { id: user._id, username, email } });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Exisiting Login
router.post('/updateProfile', authMiddleware, async (req, res) => {
    const { bio, profilePicture } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.bio = bio || user.bio;
        user.profilePicture = profilePicture || user.profilePicture;
        await user.save();

        res.json(user);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
