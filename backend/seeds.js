const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('./db');
const User = require('./models/User');
const Video = require('./models/Video');

const userSeedData = [
    {email: 'brianrlam@gmail.com', password: 'password'},
    {email: 'clarencesmith90@gmail.com', password: 'password'},
];

const videoSeedData = [
    {
        num: 494,
        title: 'Target Sum',
        difficulty: 'medium',
        lcUrl: 'https://leetcode.com/problems/target-sum/',
        ghUrl: 'https://github.com/cb299792458/LeetHub/blob/main/0494-target-sum/0494-target-sum.py',
        ytUrl: 'https://youtu.be/m5yxkqYzFpE',
    },
]

const seedData = async () => {
    try {
        await User.deleteMany();
        const hashedUserSeedData = await Promise.all(
            userSeedData.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return {...user, hashedPassword};
            })
        )
        await User.insertMany(hashedUserSeedData);

        await Video.deleteMany();
        await Video.insertMany(videoSeedData);

        console.log('Seeding Successful');
    } catch (error) {
        console.error(error);
    } finally {
        db.close();
    }
}

db.on('open', () => {
    console.log('Connected to MongoDB for Seeding');
    seedData();
});
db.on('error', (error) => {
    console.error(error);
});