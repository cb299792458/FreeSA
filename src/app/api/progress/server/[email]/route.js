import { connectToDatabase } from "../../../../../../utils/mongodb";

export async function GET(request, {params}) {
    try {
        const {email} = params;
        const {client} = await connectToDatabase();
        const db = client.db('freesa-db');
        const collection = db.collection('users');
    
        const user = await collection.findOne({email});
    
        return Response.json(user);
    } catch (err) {
        return Response.json({err});
    }
};

export async function PATCH(request, {params}) {
    try {
        const {email} = params;
        const {client} = await connectToDatabase();
        const db = client.db('freesa-db');
        const collection = db.collection('users');
    
        const {progress} = request.body;
        const user = await collection.findOne({email});


    
        return Response.json(user);
    } catch (err) {
        return Response.json({err});
    }
}
