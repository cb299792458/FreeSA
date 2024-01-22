import { connectToDatabase } from "../../../../../utils/mongodb";

export async function GET(req, {params}) {
    const {email} = params;
    
    try {
        const {client} = await connectToDatabase();
        const db = client.db('freesa-db');
        const collection = db.collection('users');
    
        const user = await collection.findOne({email});
        if (!user) return Response.json({error: 'User Not Found'});
        const {completed} = user;

        // returns completed as JSON
        // key is String(problemNumber)
        // value is Boolean
        // missing keys are undefined -> falsy

        return Response.json({
            email,
            completed,
        });
    } catch (err) {
        console.error(err);
        return Response.json({err});
    }
};
