const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const sendgridOptions = {
    auth: {
        api_key: process.env.SENDGRID_API_KEY,
    },
};
const transporter = nodemailer.createTransport(sgTransport(sendgridOptions));

function sendConfirmationEmail(email, token) {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3001';
    const confirmationUrl = `${baseUrl}/api/user/confirm?email=${email}&token=${token}`
    const mailOptions = {
        from: 'brianrlam@gmail.com',
        to: email,
        subject: 'Welcome to FreeSA',
        text: 'Please confirm your email address by clicking this link.',
        html: `<html>
            <a href="${confirmationUrl}">Confirm Your Email</a>
        </html>`
    };
  
    transporter.sendMail(mailOptions, (error) => {
        if (error) console.error('Error:', error);
        console.log('Email sent');
    });
};
  

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

        sendConfirmationEmail(email, newUser.emailToken);

        res.status(201).json({
            message: 'Sign Up Successful',
            user: newUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error in User Registration'});
    }
})

router.post('/signin', async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({error: 'Invalid email or password'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
        if (!isPasswordValid) {
            return res.status(401).json({error: 'Invalid email or password'});
        }

        res.json({
            message: 'Sign In Successful',
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error in User Log In'});
    }
});

router.get('/confirm', async (req, res) => {
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