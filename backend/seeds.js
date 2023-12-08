const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('./db');
const User = require('./models/User');
const Video = require('./models/Video');

const userSeedData = [
    {
        email: 'brianrlam@gmail.com',
        password: 'password',
        isAdmin: true,
        emailConfirmed: true,
    },
    {
        email: 'clarencesmith90@gmail.com',
        password: 'password',
        isAdmin: true,
        emailConfirmed: true,
    },
    {
        email: 'demo@user.com',
        password: 'password',
    }
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
    {
        num: 121,
        title: 'Best Time to Buy and Sell Stock',
        difficulty: 'easy',
        lcUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
        ghUrl: 'https://github.com/cb299792458/LeetHub/blob/main/0121-best-time-to-buy-and-sell-stock/0121-best-time-to-buy-and-sell-stock.py',
        ytUrl: 'https://youtu.be/mqw_dWYr7kY',
        references: [
            'https://www.freecodecamp.org/news/time-complexity-of-algorithms/',
            'https://www.geeksforgeeks.org/understanding-time-complexity-simple-examples/',
        ]
    },
    {
        num: 125,
        title: 'Valid Palindrome',
        difficulty: 'easy',
        lcUrl: 'https://leetcode.com/problems/valid-palindrome/',
        ghUrl: 'https://github.com/cb299792458/LeetHub/blob/main/0125-valid-palindrome/0125-valid-palindrome.py',
        ytUrl: 'https://youtu.be/Msk1QdDamoA',
    },
    {
        num: 141,
        title: 'Linked List Cycle',
        difficulty: 'easy',
        lcUrl: 'https://leetcode.com/problems/linked-list-cycle/',
        ghUrl: 'https://github.com/cb299792458/LeetHub/blob/main/0141-linked-list-cycle/0141-linked-list-cycle.py',
        ytUrl: 'https://youtu.be/07eRfdVXu4k',
    },
    {
        num: 1688,
        title: 'Count of Matches in Tournament',
        difficulty: 'easy',
        lcUrl: 'https://leetcode.com/problems/count-of-matches-in-tournament/',
        ghUrl: '',
        ytUrl: 'https://youtu.be/Wx9S9ArG1qk',
    }
]

const seedData = async () => {
    try {
        await User.deleteMany();
        const hashedUserSeedData = await Promise.all(
            userSeedData.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return {...user, hashedPassword};
            })
        );
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