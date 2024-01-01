import { MongoClient } from 'mongodb';

let client;
let db;

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(process.env.MONGODB_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });

        await client.connect();
        db = client.db('test');
    }

    return db;
}

export { connectToDatabase };