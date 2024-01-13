import { connectToDatabase } from "../../../../../utils/mongodb";
import bcrypt from 'bcryptjs';

export async function POST(req) {
    const {email, password} = await req.json();

    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');

        const user = await collection.findOne({email});
        if (!user) return Response.json({error: 'Invalid Credentials'});

        const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!passwordMatch) return Response.json({error: 'Invalid Credentials'});

        return Response.json({
            message: 'Authentication Successful',
            user,
            ok: true,
        });

    } catch (error) {
        console.error(error);
        return Response.json({error});
    }
}
