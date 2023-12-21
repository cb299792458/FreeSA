const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    emailConfirmed: {
        type: Boolean,
        default: false,
    },
    emailToken: {
        type: String,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;