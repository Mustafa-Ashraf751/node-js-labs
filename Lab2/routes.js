import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function handleRoutes(req, res) {
  let stream;
  const josnFilePath = path.join(__dirname, 'data.json');

  if (req.url === '/') {
    res.writeHead(200, { 'content-type': 'text/html' });
    const page1 = path.join(__dirname, 'templates', 'page1.html');
    stream = fs.createReadStream(page1);
  } else if (req.url === '/styles/style1.css') {
    res.writeHead(200, { 'content-type': 'text/css' });
    const style1 = path.join(__dirname, 'styles', 'style1.css');
    stream = fs.createReadStream(style1);
  } else if (req.url === '/scripts/read.js') {
  } else if (req.url === '/data.json') {
    res.writeHead(200, { 'content-type': 'application/json' });
    stream = fs.createReadStream('/data.json');
  }
  if (stream) {
    stream.pipe(res);
  } else {
    res.end();
  }
}
