const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

function generateRandomToken(length = 32) {
    return crypto.randomBytes(length).toString('hex');
}

const router = express.Router();

router.get('/', (_req, res) => {
    res.json({message: 'This is the User Routes'});
})

// secret stuff...remove this for production
router.get('/index', async (_req, res) => {
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
        const emailToken = generateRandomToken();

        const newUser = new User({email, hashedPassword, emailToken});
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

        const user = await User.findOne({username});
        if (!user) {
            return res.status(401).json({error: 'Invalid username or password'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
        if (!isPasswordValid) {
            return res.status(401).json({error: 'Invalid username or password'});
        }

        res.json({ message: 'Sign In Successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error in User Log In'});
    }
});

router.get('/confirm', async (req, res) => {
    console.log(req.query)
    try {
        const {email, token} = req.query;
        const user = await User.findOne({email});
        if (user.emailToken===token) {
            user.emailConfirmed = true;
            await user.save();
            res.json({message: 'Email Confirmed'});
        } else {
            res.json({message: 'Invalid Token'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error in Email Confirmation'});
    }
});

module.exports = router;