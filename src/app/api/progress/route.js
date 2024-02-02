import { connectToDatabase } from "../../../../utils/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "../../../../models/User";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return Response.json({progress: {}});

    const email = session?.user?.email;
    const displayName = session?.user?.name;

    try {
        const {client} = await connectToDatabase();
        const db = client.db('freesa-db');
        const collection = db.collection('users');

        let user = await collection.findOne({email});
        if (!user) {
            user = new User({email, displayName, progress: {}});
            await collection.insertOne(user);
        }

        const {progress} = user;

        // returns completed as JSON
        // key is String(problemNumber)
        // value is Boolean
        // missing keys are undefined -> falsy

        return Response.json({
            email,
            progress,
        });
    } catch (err) {
        console.error(err);
        return Response.json({err});
    }
}

export async function PATCH(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return Response.json({msg: 'not logged in'});
    
        const email = session?.user?.email;

        const {progress} = await req.json();

        const {client} = await connectToDatabase();
        const db = client.db('freesa-db');
        const collection = db.collection('users');

        collection.updateOne(
            {email},
            {$set: {progress}},
        );        

        return Response.json({
            ok: true,
            email,
            progress,
        });

    } catch (err) {
        console.error(err);
        return Response.json({err});
    }
}
