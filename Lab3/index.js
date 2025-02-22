import bodyParser from 'body-parser';
import express from 'express';
import employeeRouter from './routes/employee.js';

const app = express();

app.use(express.json());

app.use(bodyParser.json());

app.use(employeeRouter);

app.listen(3000, () => {
  console.log('Server is running on localhost:3000');
});
