// Google API Youtube Connection
const { google } = require('googleapis');
const td = require('tinyduration');

const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY
});

const express = require('express');
const Video = require('../models/Video');

const router = express.Router();

router.get('/', (_req, res) => {
    res.json({message: 'This is the Video Routes'});
})

router.get('/index', async (_req, res) => {
    try {
        const videos = (await Video.find()).map(video => JSON.parse(JSON.stringify(video)));

        const response = await youtube.videos.list({
            id: videos.map(video => video.ytUrl.split("/").at(-1)).toString(), // Comma Separated YtIds
            part: ['snippet', 'contentDetails'], //Basic Resource Info
        })

        videos.forEach((video, idx) => {
            video.thumbnailUrl = response.data.items[idx].snippet.thumbnails.medium.url;
            video.duration = td.parse(response.data.items[idx].contentDetails.duration);
        });


        res.json(videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.get('/:num', async (req, res) => {
    const num = req.params.num;

    

    try {
        const video = JSON.parse(JSON.stringify((await Video.findOne({num}))));
        if (!video) return res.status(404).json({message: 'Video Not Found'});

        const youTubeResource = await youtube.videos.list({
            id: video.ytUrl.split("/").at(-1), // YouTube Resource Id
            part: ['snippet', 'contentDetails'], // Basic Resource Info
        });
    
        video.thumbnailUrl = youTubeResource.data.items[0].snippet.thumbnails.medium.url;
        video.duration = td.parse(youTubeResource.data.items[0].contentDetails.duration);
        console.log(video);
        res.json(video);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
})

router.post('/new', async (req, res) => {
    try {
        const video = req.body;
        const newVideo = new Video(video);
    
        await newVideo.save();
    
        res.status(201).json({ message: 'Video uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;