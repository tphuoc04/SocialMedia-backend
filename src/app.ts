import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './models/db';
import { indexRouter } from './routes';


// Make data base connection
connectDB()

const app: Application = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', indexRouter);

export default app;
