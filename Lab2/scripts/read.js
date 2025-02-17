import { promises as fs } from 'fs';
import fsSync from 'fs';
import { join } from 'path';

const __dirname = new URL('.', import.meta.url).pathname;
const filePath = join(__dirname, 'data.json');

export async function readAll() {
  try {
    const employees = fetch('/data')
      .then((response) => response.json)
      .then((data) => {
        const mainContainer = document.querySelector('.main-container');
        data.forEach((element) => {
          const employeeDiv = document.createElement('div');
          employeeDiv.textContent = element;
          mainContainer.appendChild(employeeDiv);
        });
      });
    const array = employees
      .map(
        (emp) =>
          `Name: ${emp.name} Email:${emp.email} Salary:${emp.salary} Level:${emp.level} Years:${emp.years}\n`,
      )
      .join('\n');
    console.log(array);
  } catch (error) {
    console.error(error.message);
  }
}
