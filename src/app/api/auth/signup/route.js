import { connectToDatabase } from "../../../../../utils/mongodb";
import User from "../../../../../models/User";
import bcrypt from 'bcryptjs';

export async function POST(req) {
    const {email, displayName, password} = await req.json();

    try {
        const {client} = await connectToDatabase();
        const db = client.db('freesa-db');
        const collection = db.collection('users');

        const existingUser = await collection.findOne({email});
        if (existingUser) {
            return Response.json({error: 'User with email already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            displayName,
            hashedPassword,
        });

        await collection.insertOne(newUser)
        return Response.json({
            message: 'Registration Successful',
            newUser,
            ok: true,
        });

    } catch (error) {
        console.error(error);
        return Response.json({error});
    }
}
