import express from 'express';
import cors from 'cors';
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
import pagesRoute from './Routes/pages.js';
import { componentLoader } from './components/components.js';

dotenv.config();

const app = express();

// Apply custom body parser middleware
app.use(bodyParserMiddleware);

app.use(express.static('/public'));

// Apply other middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use('/uploads', express.static('/uploads'));

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
app.use('/', pagesRoute); // Mount the pages route

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

// Export the function that Vercel will use to handle requests
export default (req, res) => {
  return new Promise((resolve, reject) => {
    app(req, res).then(resolve).catch(reject);
  });
};
