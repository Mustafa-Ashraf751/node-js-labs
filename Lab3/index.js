import express from 'express';
import router from './routes/index.js';

const app = express();

app.use(express.json());

app.use(express.static('public'));

app.set('view engine', 'pug');

app.set('views', './templates');

app.use(router);

app.listen(3000, () => {
  console.log('Server is running on localhost:3000');
});
