import { promises as fs } from 'fs';
import { existsSync, writeFile } from 'fs';
import { join } from 'path';
import { validateOptions } from './validateOptions.js';

const __dirname = new URL('.', import.meta.url).pathname;
const filePath = join(__dirname, 'data.json');

const default_employee = {
  level: 'Jr',
  years: 0,
};

let nextId = 1;

export async function createFile(employeesData) {
  try {
    try {
      await fs.access(filePath);
    } catch {
      await fs.writeFile(filePath, '[]', 'utf8');
    }

    const data = fs.readFile(filePath, 'utf8');
    const employees = JSON.parse(data);

    validateOptions(employeesData);

    const employee = {
      id: nextId++,
      ...default_employee,
      ...employeesData,
    };

    // for (const [key, value] of Object.entries(employeesData)) {
    //   employee[key] = value;
    // }

    employees.push(employee);
    await fs.writeFile(filePath, JSON.stringify(employees));

    console.log('Employee added to file successfully');
  } catch (error) {
    console.error('Some thing wrong with message: ', error.message);
  }
}
