const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config()

const email = process.env.email
const pass = process.env.pass


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: email,
        pass: pass
    }
});

module.exports = transporter;