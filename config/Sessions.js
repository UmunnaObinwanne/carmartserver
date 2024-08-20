import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from './database.js'; // Ensure this path is correct

import dotenv from 'dotenv';
dotenv.config();

const dbLink = process.env.mongoURI;

const sessionConfig = session({
  secret: 'Agubush22018!!',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: dbLink }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use `true` in production if using HTTPS
    sameSite: 'lax', // Adjust as needed
    maxAge: 15 * 60 * 1000 // 15 minutes
  },
});

export default sessionConfig;
