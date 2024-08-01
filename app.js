const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors');
const passport = require('./config/Passport');
const sessionConfig = require('./config/Sessions');
const bodyParser = require('body-parser');
const refreshSession = require('./Middleware/refreshSession');
const authRoutes = require('./Routes/AuthRoutes')
const categoriesRoute = require('./Routes/CategoryRoutes')
const modelsRoute = require('./Routes/ModelsRoute')
const advertRoutes = require('./Routes/AdvertRoutes')
const optionsRouter = require('./Routes/options');
const authCheckRouter = require('./Routes/authChecker')
const profileRoute = require('./Routes/ProfileRoute')
const messageRoute = require('./Routes/MessagesRoute')
const imageUploadRoute = require('./Routes/imageRoute')
const path = require('path');



//initialize express with app
const app = express(); 


// Load environment variables from.env file
dotenv.config()

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//initialMiddleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//applying cors
app.use(cors({
  origin: 'http://localhost:5174', // specify your frontend origin
  credentials: true, // allow credentials (cookies, authorization headers, etc.)
}));



//declare environment variables
const PORT = process.env.PORT

app.use(sessionConfig);
app.use(passport.initialize())
app.use(passport.session());
app.use(refreshSession)

//importing Routes
app.use('/', authRoutes)
app.use('/', categoriesRoute)
app.use('/', modelsRoute)
app.use('/', advertRoutes)
app.use('/', optionsRouter)
app.use('/', authCheckRouter)
app.use('/', profileRoute)
app.use('/user', messageRoute)
app.use('/image', imageUploadRoute)



app.listen(PORT, (req, res) => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})