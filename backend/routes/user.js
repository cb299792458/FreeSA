const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({message: 'This is the User Routes'});
})

router.get('/all', async (req, res) => {
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
        const {username, password} = req.body;
        const newUser = new User({username, password});
        await newUser.save();
        res.status(201).json({message: 'Sign Up Successful'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error in User Registration'});
    }
})

module.exports = router;