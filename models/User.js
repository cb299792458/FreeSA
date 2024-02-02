const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    displayName: {
        type: String,
        required: true,
    },

    // // Move all auth to next-auth

    // hashedPassword: {
    //     type: String,
    //     required: true,
    // },
    // isAdmin: {
    //     type: Boolean,
    //     default: false,
    // },
    // emailConfirmed: {
    //     type: Boolean,
    //     default: false,
    // },
    // emailToken: {
    //     type: String,
    // },

    progress: {
        type: Object,
        default: {},
    },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
