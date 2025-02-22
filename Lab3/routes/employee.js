import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import validateOptions from '../scripts/validateOptions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

const dataPath = path.join(__dirname, 'data.json');
console.log(dataPath);

router.get('/employees', async (req, res) => {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    const employeeData = JSON.parse(data);
    res.status(200).json(employeeData);
  } catch (error) {
    res.status(500).send('Sorry something go wrong');
  }
});

router.get('/employees/:id', async (req, res) => {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    const employeeData = JSON.parse(data);
    const employee = employeeData.find(
      (emp) => emp.id === Number.parseInt(req.params.id),
    );
    if (!employee) throw new Error();
    res.status(200).json(employee);
  } catch (error) {
    res.status(404).send('Sorry employee you want not found try again!');
  }
});

// const validationMiddleware = (req, res, next) => {
//   const errors = validateOptions(req.body);
//   console.log(req.body);
//   if (!errors.isEmpty()) {
//     res.status(400).json({ errors: errors.array() });
//   }
//   next();
// };

router.post('/employees', (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    validateOptions(data);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).send('Invalid data input please try again!');
  }
});

export default router;
