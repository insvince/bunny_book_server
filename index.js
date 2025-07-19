import express from 'express';
import env from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import authorRoute from './routes/author.route.js';
import bookRoute from './routes/book.route.js';
import genresRoute from './routes/genres.route.js';
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

/* ROUTES */
app.use('/api/authors', authorRoute);
app.use('/api/books', bookRoute);
app.use('/api/genres', genresRoute);
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/carts', cartRoute);

app.listen(process.env.PORT || 3333, () => console.log('Server is running'));

export default mongoose;
