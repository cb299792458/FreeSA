import { connectToDatabase } from '../../../../../../utils/mongodb';

export async function GET(req, {params}) {
    try {
        const {videoNum} = params;

        const {client} = await connectToDatabase();
        const db = client.db('freesa-db');
        const collection = db.collection('comments');

        const comments = await collection.find({videoNum: parseInt(videoNum)}).toArray();

        return Response.json({comments});
    } catch (error) {
        console.error(error);
        return Response.json({error});
    }
}
