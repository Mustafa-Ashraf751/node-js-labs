import http from 'node:http';
import { handleRoutes } from './routes.js';

function Main() {
  const server = http.createServer(handleRoutes);

  server.listen(3000, 'localhost', () => {
    console.log('Server is up and running on http://localhost:3000');
  });
}

Main();
