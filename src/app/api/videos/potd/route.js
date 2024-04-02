import { connectToDatabase } from '../../../../../utils/mongodb';

const { google } = require('googleapis');
// const td = require('tinyduration');

const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY,
});

export async function GET(request, {params}) {
    try {
        // const {id} = params;
        // const {client} = await connectToDatabase();
        // const db = client.db('freesa-db');
        // const collection = db.collection('videos');
    
        // const video = await collection.findOne({num: parseInt(id)});

        console.assert(false, "Beginning YOUTUBE REQUEST");
        const youTubeResource = await youtube.search.list({
            part: "snippet",
            type: "video",
            order: "viewCount",
            q: "Leetcode Problem 205 Solution|Walkthrough Explained",
            regionCode: "US",
            safeSearch: "strict",
        })
        
         // need error handling for invalid yt urls in mongo
        // video.thumbnailUrl = youTubeResource.data.items[0].snippet.thumbnails.medium.url;
        // video.duration = td.parse(youTubeResource.data.items[0].contentDetails.duration);
        console.assert(youTubeResource, "NO RESOURCE RETURNED")
        return Response.json(youTubeResource.data.items[0].id.videoId);
    } catch (error) {
        console.error("THAT BROKE IT" + ` Error: ${error}`)
        return Response.json({error});
    }
};