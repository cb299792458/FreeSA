const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt')

const router = express.Router();

router.get('/', (_req, res) => {
    res.json({message: 'This is the User Routes'});
})

// secret stuff...remove this for production
router.get('/all', async (_req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.post('/signup', async (req, res) => {
    try {
        const {email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({email, hashedPassword});
        await newUser.save();

        res.status(201).json({message: 'Sign Up Successful'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error in User Registration'});
    }
})

router.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        res.json({ message: 'Sign In Successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error in User Log In' });
    }
});

module.exports = router;