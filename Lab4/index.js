import process from 'node:process';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import errorHandler from './middleware/errorHandler.js';
import router from './routes/index.js';
import 'express-async-errors';
import 'dotenv/config';

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(express.static('public'));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
    process.exit(1);
  });

const allowedOrigins = ['http://localhost:5501', 'http://127.0.0.1:5501'];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET'],
    allowedHeaders: ['Content-type', 'Authorization'],
    credentials: true
  })
);

app.use(router);

app.use(errorHandler);

app.listen(port, () => {
  console.log('Server is running on localhost:3000');
});
