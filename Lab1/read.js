const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "data.json");
const { checkFileAndData } = require("./checkforFileAndData");

async function readAll() {
  try {
    const employees = await checkFileAndData(fsSync, filePath, fs);
    const array = employees
      .map(
        (emp) =>
          `Name: ${emp.name} Email:${emp.email} Salary:${emp.salary} Level:${emp.level} Years:${emp.years}\n`
      )
      .join("\n");
    console.log(array);
  } catch (error) {
    console.error(error.message);
  }
}

async function readById(id) {
  try {
    const employees = await checkFileAndData(fsSync, filePath, fs);
    const numberId = Number.parseInt(id);
    const employee = employees.find((emp) => emp.id === numberId);
    if (employee) {
      console.log(employee);
    } else {
      throw new Error('"Sorry the employee not found please try again"');
    }
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { readAll, readById };
