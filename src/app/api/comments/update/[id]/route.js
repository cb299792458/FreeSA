import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../../../utils/mongodb";

export async function PUT(request, {params}) {
    try {
        const {id} = params;
        const body = await request.json(); // this is the user's display name, from session.user.name
        const {displayName, text} = body;

        const {client} = await connectToDatabase();
        const db = client.db('freesa-db');
        const collection = db.collection('comments');

        const _id = new ObjectId(id); // this is how mongo identifies data

        const comment = await collection.findOne({_id});
        if (!comment) return Response.json({error: 'Comment not found'});
        if (comment.displayName !== displayName) return Response.json({error: 'You are not the author of this comment'});
    
        const result = await collection.updateOne({_id}, {$set: {text, updatedAt: new Date()}});
    
        return Response.json({result});
    } catch (error) {
        return Response.json({error});
    }
}
