import mongoose from 'mongoose';
import UserModel from './models/UserModel.js'; // Adjust the path as needed
import dotenv from 'dotenv';


dotenv.config();

// MongoDB URI from environment variables
const mongoURI = process.env.mongoURI;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');

    // Create the admin user
    const createAdmin = async () => {
        try {
            // Check if the user already exists
            const existingUser = await UserModel.findOne({ email: 'umunnaobinwanne@yahoo.com' });
            if (existingUser) {
                console.log('Admin user already exists.');
                return;
            }

            // Create a new admin user
            const newAdmin = new UserModel({
                username: 'MikeBush', // Provide a default or specific username
                email: 'umunnaobinwanne@yahoo.com',
                password: await UserModel.prototype.hashPassword('Agubush22018!!'),
                isAdmin: true,
                isActive: true,
                isEmailVerified: true
            });

            // Save the user to the database
            await newAdmin.save();
            console.log('Admin user created successfully.');

        } catch (err) {
            console.error('Error creating admin user:', err);
        } finally {
            // Close the database connection
            mongoose.connection.close();
        }
    };

    createAdmin();
});

mongoose.connection.on('error', (err) => {
    console.error('Database connection error:', err);
});
