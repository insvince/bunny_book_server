import express from 'express';
import env from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import authorRoute from './routes/author.route.js';
import bookRoute from './routes/book.route.js';
import categoriesRoute from './routes/categories.route.js';
import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js';
import cartRoute from './routes/cart.route.js';

/* INIT APP */
const app = express();
env.config();

app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb' }));
app.use(cookieParser());
app.use(cors());

/* CONNECT MONGODB */
mongoose
    .connect(process.env.MONGODB_URL)
    .then(console.log('Connected Database!!!'));

/* ROUTES */
app.use('/api/author', authorRoute);
app.use('/api/book', bookRoute);
app.use('/api/categories', categoriesRoute);
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/cart', cartRoute);

app.listen(process.env.PORT || 3333, () => console.log('Server is running'));
