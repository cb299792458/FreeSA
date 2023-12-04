const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = Schema({
    num: { // LeetCode Problem Number
        type: Number,
        index: true, // used to look up video
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['easy', 'medium', 'hard'],
    },
    lcUrl: { // LeetCode problem URL
        type: String,
    },
    ghUrl: { // GitHub (solution from LeetHub)
        type: String,
    },
    ytUrl: { // YouTube (add "embed/" after .com/)
        type: String,
    },
    references: { // links for more info
        type: [String], // should default to empty array
    }

});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;