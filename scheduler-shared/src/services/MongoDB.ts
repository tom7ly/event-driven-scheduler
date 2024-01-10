import mongoose from 'mongoose';
import { APIErr } from '../utils/APIutils';
import { Connection } from 'mongoose';
export async function initMongoDB(uri: string): Promise<Connection> {
    return await mongoose.connect(uri).then(() => {
        console.log('Connected to MongoDB');
        const db: Connection = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.once('open', () => {
            console.log("Connected to MongoDB")
        })
        return db;
    }).catch((err) => {
        console.log('Error connecting to MongoDB: ', err);
        throw new APIErr(500, "Error connecting to MongoDB");
    })
}
