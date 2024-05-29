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
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'User does not exist' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, 'secret');
        res.json({ token, user: { id: user._id, username: user.username, email } });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
