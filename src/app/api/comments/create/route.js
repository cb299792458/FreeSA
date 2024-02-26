import { connectToDatabase } from '../../../../../utils/mongodb';

export async function POST(req) {
    try {
        const data = await req.json();
        const comment = {...data, videoNum: parseInt(data.videoNum), createdAt: (new Date())};
        
        const {client} = await connectToDatabase();
        const db = client.db('freesa-db');
        
        const collection = db.collection('comments');

        const result = await collection.insertOne(comment);

        return Response.json({result, comment, ok: true});
    } catch (error) {
        console.error(error);
        return Response.json({error});
    }
}
