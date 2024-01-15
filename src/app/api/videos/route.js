import { connectToDatabase } from '../../../../utils/mongodb';

export async function POST(req) {
    try {
        const data = await req.json();
        const video = {...data, num: parseInt(data.num)};
        
        const {client} = await connectToDatabase();
        const db = client.db('freesa-db');
        const collection = db.collection('videos');

        const result = await collection.insertOne(video);

        return Response.json({result, video, ok: true});
    } catch (error) {
        console.error(error);
        return Response.json({error})
    }
}

export async function PATCH(req) {
    console.log('do it on mongo.db');
    return Response.json({});
}

export async function DELETE(req) {
    console.log('do it on mongo.db');
    return Response.json({});
}
