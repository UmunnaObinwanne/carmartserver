const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('./database'); // Import the mongoose instance

const dotenv = require('dotenv')
dotenv.config()

const  dbLink = process.env.mongoURI

const sessionConfig = session({
  secret: 'Agubush22018!!',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: dbLink  }), // Directly use the connection string
  cookie: {
    httpOnly: true,
    secure: false, // Set to true if you're using HTTPS
    sameSite: 'lax', // Adjust based on your needs ('strict', 'lax', 'none')
    maxAge: 15 * 60 * 1000 // 15 minutes
  },
});

module.exports = sessionConfig;