import { connectToDatabase } from '../../../../../utils/mongodb';

const { google } = require('googleapis');
const td = require('tinyduration');

const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY
});

export async function GET(request, {params}) {
    try {
        const {id} = params;
        const db = await connectToDatabase();
        const collection = await db.collection('videos');
    
        const video = await collection.findOne({num: parseInt(id)});
    
        const youTubeResource = await youtube.videos.list({
            id: video.ytUrl.split("/").at(-1), // YouTube Resource Id
            part: ['snippet', 'contentDetails'], // Basic Resource Info
        });
    
        video.thumbnailUrl = youTubeResource.data.items[0].snippet.thumbnails.medium.url;
        video.duration = td.parse(youTubeResource.data.items[0].contentDetails.duration);
    
        return Response.json(video);
    } catch (error) {
        return Response.json({error});
    }
};
