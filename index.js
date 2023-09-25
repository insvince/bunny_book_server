import express from 'express';
import env from 'dotenv';
import jwt from 'jsonwebtoken';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import authRoute from './routes/auth.js';
import bookRoute from './routes/book.js';
import categoriesRoute from './routes/categories.js';
import mongoose from 'mongoose';

env.config();
const app = express();

app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb' }));
app.use(cors());

/* CONNECT MONGODB */
mongoose
    .connect(process.env.MONGODB_URL)
    .then(console.log('Connected Database!!!'));

/* ROUTES */
app.use('/api/auth', authRoute);
app.use('/api/book', bookRoute);
app.use('/api/categories', categoriesRoute);

app.listen(process.env.PORT || 3333, () => console.log('Server is running'));
