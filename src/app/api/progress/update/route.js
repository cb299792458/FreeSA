import { connectToDatabase } from "../../../../../utils/mongodb";

export async function POST(req) {
    // send completed as JSON
    // key is String(problemNumber)
    // value is Boolean
    
    // don't update singular entry,
    // deconstruct and send updated copy
    const {email, completed} = await req.json();

    try {
        const {client} = await connectToDatabase();
        const db = client.db('freesa-db');
        const collection = db.collection('users');

        collection.updateOne(
            {email},
            { $set: {completed}},
        );        

        return Response.json({
            ok: true,
            email,
            completed,
        });

    } catch (error) {
        console.error(error);
        return Response.json({error});
    }
}
