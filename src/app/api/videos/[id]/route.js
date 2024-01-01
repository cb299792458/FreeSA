import { connectToDatabase } from '../../../../../utils/mongodb';

export async function GET(request, {params}) {
    const {id} = params;
    const db = await connectToDatabase();
    const collection = db.collection('videos');

    const video = await collection.findOne({num: parseInt(id)});
    return Response.json(video);
};