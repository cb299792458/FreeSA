import { connectToDatabase } from '../../../../../utils/mongodb';

const { google } = require('googleapis');
const td = require('tinyduration');

const youtube = await google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY
});

export async function GET() {
    try {
        const {client} = await connectToDatabase();
        const db = client.db('freesa-db');
        const collection = db.collection('videos');
    
        const videos = await collection.find({}).toArray();
    
        const response = await youtube.videos.list({
            id: videos.map(video => video.ytUrl.split("/").at(-1)).toString(), // Comma Separated YtIds
            part: ['snippet', 'contentDetails'], // Basic Resource Info
        })
        const tags = new Set();
    
        videos.forEach((video, idx) => { // need error handling for invalid yt urls in mongo
            video.thumbnailUrl = response.data.items[idx].snippet.thumbnails.medium.url;
            video.duration = td.parse(response.data.items[idx].contentDetails.duration);
            if(video.tag) tags.add(video.tag);
        });

        
        
        return Response.json({videos, tagNames: Array.from(tags)});

    } catch (error) {
        console.log(error);
        return Response.json({error});
    }
};
