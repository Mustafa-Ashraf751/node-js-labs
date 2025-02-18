import fs from 'node:fs';
import { promises as fsPromises } from 'node:fs';
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
  '/astronomy/download': {
    filePath: path.join(
      __dirname,
      'static',
      '200505225212-04-fossils-and-climate-change-museum.jpg',
    ),
    contentType: 'application/octet-stream',
    contentDisposition:
      'attachment; filename="200505225212-04-fossils-and-climate-change-museum.jpg"',
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
  '/employee': {
    filePath: path.join(__dirname, 'templates', 'page5.html'),
    contentType: 'text/html',
  },
  '/scripts/addEmployee.js': {
    filePath: path.join(__dirname, 'scripts', 'addEmployee.js'),
    contentType: 'text/javascript',
  },
  '/scripts/validateOptions.js': {
    filePath: path.join(__dirname, 'scripts', 'validateOptions.js'),
    contentType: 'text/javascript',
  },
  '/styles/style5.css': {
    filePath: path.join(__dirname, 'styles', 'style5.css'),
    contentType: 'text/css',
  },
};

// This won't work because the server reset it every time it restarts because it's stores in memory
// let nextId = 1;

export async function handleRoutes(req, res) {
  let stream;
  const route = routeMap[req.url];

  // Handle Post Request
  if (req.url === '/employee' && req.method === 'POST') {
    const filePath = path.join(__dirname, 'data.json');
    try {
      await fsPromises.access(filePath);
    } catch {
      await fsPromises.writeFile(filePath, '[]', 'utf8');
    }
    let body = '';
    for await (const chunk of req) {
      body += chunk;
    }
    const employeeData = JSON.parse(body);

    const data = await fsPromises.readFile(filePath, 'utf8');
    const employees = JSON.parse(data);

    const employee = {
      id: employees.length + 1,
      ...employeeData,
    };

    employees.push(employee);
    await fsPromises.writeFile(filePath, JSON.stringify(employees));
    res.writeHead(201, { 'content-type': 'application/json' });
    res.end(JSON.stringify(employees));
    return;
  }

  // Handle Get Requests
  if (route) {
    const headers = { 'content-type': route.contentType };
    if (route.contentDisposition) {
      headers['content-disposition'] = route.contentDisposition;
    }
    res.writeHead(200, headers);
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
