import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const mongoURI = process.env.mongoURI; // Replace with your MongoDB connection string

mongoose.connect(mongoURI, {
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

export default mongoose; // Export mongoose instead of db for simplicity
