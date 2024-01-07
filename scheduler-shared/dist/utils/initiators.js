import mongoose from 'mongoose';
import { APIErr } from './APIutils';
export async function setupDatabase(uri) {
    await mongoose.connect(uri).then(() => {
        console.log('Connected to MongoDB');
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.once('open', () => {
            console.log("Connected to MongoDB");
        });
    }).catch((err) => {
        console.log('Error connecting to MongoDB: ', err);
        throw new APIErr(500, "Error connecting to MongoDB");
    });
}
