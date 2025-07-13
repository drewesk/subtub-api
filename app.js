import express from 'express';

import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';

import connectDB from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';

import cookieParser from 'cookie-parser';
import AJMiddleware from './middlewares/arcjet.middleware.js';

const app = express();

// add nifty middleware built into express
app.use(express.json());
app.use(express.urlencoded({extended: false})); // process sent data in a simple format
app.use(cookieParser()); // reads cookies from user data/store data from incoming requests,

app.use(AJMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to SubTub subscription tracker API!');
});

app.listen(PORT, async () => {
    console.log(`SubTub API running on Local Host Port, http://localhost:${PORT}`);

    await connectDB();
});

export default app;