const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");
const { validateOptions } = require("./validateOptions");
let array = [];
const filePath = path.join(__dirname, "data.json");

async function createFile(result) {
  try {
    if (!fsSync.existsSync(filePath)) {
      fsSync.writeFile(filePath, "", "utf8", (error) => {
        if (error) {
          throw new Error("Error with creating file please try again!");
        }
      });
    }
    let firstTime = false;
    const data = await fs.readFile(filePath, "utf8");
    if (data.trim() === "") {
      firstTime = true;
    }
    let employees = [];
    if (!firstTime) {
      const data = await fs.readFile(filePath, "utf8");
      employees = JSON.parse(data);
    }

    validateOptions(result);

    let counter = 1;
    employees.forEach((employee) => {
      if (employee.id == counter) counter++;
    });

    const employee = {
      id: counter,
    };

    for (const [key, value] of Object.entries(result)) {
      employee[key] = value;
    }

    employee.level = employee.level || "Jr";
    employee.years = employee.years || 0;

    if (firstTime) {
      array.push(employee);
      await fs.writeFile(filePath, JSON.stringify(array));
    } else {
      employees.push(employee);
      await fs.writeFile(filePath, JSON.stringify(employees));
    }
    console.log("Employee added to file successfully");
  } catch (error) {
    console.error("Some thing wrong with message: ", error.message);
  }
}

module.exports = { createFile };
