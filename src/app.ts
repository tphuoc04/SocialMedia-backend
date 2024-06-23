import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import session from 'express-session';

import connectDB from './models/db';
import { authRouter, productRouter } from './routes';

import dotenv from 'dotenv';
import { auth } from 'google-auth-library';
dotenv.config();


// Make data base connection
connectDB()

const app: Application = express();

// Session
const secret = process.env.SESSION || 'secret'
app.use(
    session({
        secret: secret, 
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, 
    })
)

// Middleware
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api', productRouter);
app.use("/auth", authRouter);


export default app;
