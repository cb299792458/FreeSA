const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('./db');
const User = require('./models/User');

const userSeedData = [
    {email: 'brianrlam@gmail.com', password: 'password'},
    {email: 'clarencesmith90@gmail.com', password: 'password'},
];

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