import fs from 'node:fs';
import path from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const routeMap = {
  '/': {
    filePath: path.join(__dirname, 'templates', 'page1.html'),
    contentType: 'text/html',
  },
  '/styles/style1.css': {
    filePath: path.join(__dirname, 'styles', 'style1.css'),
    contentType: 'text/css',
  },
  '/scripts/read.js': {
    filePath: path.join(__dirname, 'scripts', 'read.js'),
    contentType: 'text/javascript',
  },
  '/data.json': {
    filePath: path.join(__dirname, 'data.json'),
    contentType: 'application/json',
  },
  '/astronomy': {
    filePath: path.join(__dirname, 'templates', 'page2.html'),
    contentType: 'text/html',
  },
  '/static/200505225212-04-fossils-and-climate-change-museum.jpg': {
    filePath: path.join(
      __dirname,
      'static',
      '200505225212-04-fossils-and-climate-change-museum.jpg',
    ),
    contentType: 'image/jpeg',
  },
  '/styles/style2.css': {
    filePath: path.join(__dirname, 'styles', 'style2.css'),
    contentType: 'text/css',
  },
  '/serbal': {
    filePath: path.join(__dirname, 'templates', 'page3.html'),
    contentType: 'text/html',
  },
  '/static/DCnpfBy.jpeg': {
    filePath: path.join(__dirname, 'static', 'DCnpfBy.jpeg'),
    contentType: 'image/jpeg',
  },
  '/styles/style3.css': {
    filePath: path.join(__dirname, 'styles', 'style3.css'),
    contentType: 'text/css',
  },
  '/styles/style4.css': {
    filePath: path.join(__dirname, 'styles', 'style4.css'),
    contentType: 'text/css',
  },
};

export function handleRoutes(req, res) {
  let stream;
  const route = routeMap[req.url];

  if (route) {
    res.writeHead(200, { 'content-type': route.contentType });
    stream = fs.createReadStream(route.filePath);
  } else {
    res.writeHead(404, { 'content-type': 'text/html' });
    stream = fs.createReadStream(
      path.join(__dirname, 'templates', 'page4.html'),
    );
  }

  stream.on('error', (error) => {
    console.error('stream error', error);
    res.writeHead(500, { 'content-type': 'text/plain' });
    res.end('Internal Server Error');
  });

  stream.pipe(res);
}
