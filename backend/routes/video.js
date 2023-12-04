const express = require('express');
const Video = require('../models/Video');

const router = express.Router();

router.get('/', (_req, res) => {
    res.json({message: 'This is the Video Routes'});
});

router.get('/index', async (_req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

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
});

router.patch('/:num', async (req, res) => {
    const num = req.params.num;

    const {title, difficulty, lcUrl, ghUrl, ytUrl, references} = req.body

    try {
        const video = await Video.findOne({num});
        if (!video) return res.status(404).json({message: 'Video Not Found'});

        video.title = title || video.title;
        video.difficulty = difficulty || video.difficulty;
        video.lcUrl = lcUrl || video.lcUrl;
        video.ghUrl = ghUrl || video.ghUrl;
        video.ytUrl = ytUrl || video.ytUrl;
        video.references = references?.length ? references : video.references; // Not tested, probably need JSON.stringify and JSON.parse

        await video.save();
        res.json(video);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:num', async (req, res) => {
  const num = req.params.num;

  try {
      const video = await Video.findOneAndDelete({ num });

      if (!video) {
          return res.status(404).json({ message: 'Video Not Found' });
      }

      res.json({ message: 'Video deleted successfully', deletedVideo: video });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
  }
});

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