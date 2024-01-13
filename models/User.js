const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    displayName: {
        type: String,
        required: true,
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
    },
    completed: {
        type: String, // Object key=problem, val=boolean
        default: '{}', // JSON stringified
    }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
