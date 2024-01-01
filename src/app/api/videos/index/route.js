import { connectToDatabase } from '../../../../../utils/mongodb';

export async function GET() {
    const db = await connectToDatabase();
    const collection = db.collection('videos');

    const videos = await collection.find({}).toArray();
    return Response.json(videos);
};