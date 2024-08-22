import express from 'express';
import dotenv from 'dotenv';
import sessionConfig from './config/Sessions.js';
import passport from './config/Passport.js';
import refreshSession from './Middleware/refreshSession.js';
import authRoutes from './Routes/AuthRoutes.js';
import categoriesRoute from './Routes/CategoryRoutes.js';
import modelsRoute from './Routes/ModelsRoute.js';
import advertRoutes from './Routes/AdvertRoutes.js';
import optionsRouter from './Routes/options.js';
import authCheckRouter from './Routes/authChecker.js';
import profileRoute from './Routes/ProfileRoute.js';
import messageRoute from './Routes/MessagesRoute.js';
import imageUploadRoute from './Routes/imageRoute.js';
import bodyParserMiddleware from './Middleware/bodyParser.js';
import pageRoutes from './Routes/pages.js';

/*
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';
import mongoose from 'mongoose';
import User from './models/UserModel.js';
import Advert from './models/AdvertModel.js';
import Chat from './models/ChatModel.js';
import CarModel from './models/CarModel.js';
import CarCategory from './models/CategoryModel.js';
import PageResource from './resources/PageResource.js';
import { componentLoader } from './components/components.js';

*/

dotenv.config();

const app = express();




// Apply custom body parser middleware
app.use(bodyParserMiddleware);

app.get("/", (req, res) => {  // Corrected order of parameters
  res.json("Welcome to CarMart!");
})

//app.use(express.static('/public'));

//app.use('/uploads', express.static('/uploads'));

app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());
app.use(refreshSession);

// Define your routes
app.use('/', authRoutes);
app.use('/', categoriesRoute);
app.use('/', modelsRoute);
app.use('/', advertRoutes);
app.use('/', optionsRouter);
app.use('/', authCheckRouter);
app.use('/', profileRoute);
app.use('/user', messageRoute);
app.use('/image', imageUploadRoute);
app.use('/', pageRoutes); // Mount the pages route




/*
// --- AdminJS Integration Start ---
AdminJS.registerAdapter(AdminJSMongoose);
const adminJs = new AdminJS({
  resources: [PageResource, CarCategory, Chat, Advert, User, CarModel],
  componentLoader,
  branding: {
    logo: '/shopmart logo.jpg',
  },
  rootPath: '/admin',
});
const adminJsRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminJsRouter);
console.log(`AdminJS connected successfully at ${adminJs.options.rootPath}`);
// --- AdminJS Integration End ---

*/

// Start the server
const PORT =  5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});