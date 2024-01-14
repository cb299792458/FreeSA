import { connectToDatabase } from '../../../../../utils/mongodb';

const { google } = require('googleapis');
const td = require('tinyduration');

const youtube = google.youtube({
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
            part: ['snippet', 'contentDetails'], //Basic Resource Info
        })
    
        videos.forEach((video, idx) => {
            video.thumbnailUrl = response.data.items[idx].snippet.thumbnails.medium.url;
            video.duration = td.parse(response.data.items[idx].contentDetails.duration);
        });
        
        return Response.json(videos);

    } catch (error) {
        console.log(error)
        return Response.json({error});
    }
};
