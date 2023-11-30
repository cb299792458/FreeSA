const express = require('express');
const Video = require('../models/Video');

const router = express.Router();

router.get('/', (_req, res) => {
    res.json({message: 'This is the Video Routes'});
})

router.get('/index', async (_req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/:num', async (req, res) => {
    const num = req.params.num;

    try {
        const video = await Video.findOne({num});
        if (!video) return res.status(404).json({message: 'Video Not Found'});

        res.json(video);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;