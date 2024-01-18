import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client;

if (!uri) throw new Error('Please add your Mongo URI to .env.local');

export async function connectToDatabase() {
    try {
        if (client) {
            return { client };
        }

        client = await (new MongoClient(uri, {serverApi: 
            {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }})
        ).connect();
        console.log('Connected to MongoDB');
        return { client };
    } catch (err) {
        console.error(err);
    }
}
