import process from 'node:process';
import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index.js';
import 'dotenv/config';

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(express.static('public'));

console.log(process.env.MONGODB_URI);

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

app.use(router);

app.listen(port, () => {
  console.log('Server is running on localhost:3000');
});
