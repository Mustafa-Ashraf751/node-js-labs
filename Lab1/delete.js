const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "data.json");
const { checkFileAndData } = require("./checkforFileAndData");

async function deleteEmployee(id) {
  try {
    const employees = await checkFileAndData(fsSync, filePath, fs);
    const employeeExists = employees.some(
      (emp) => emp.id === Number.parseInt(id)
    );

    if (!employeeExists) {
      throw new Error(`Sorry the employee with id ${id} not found!`);
    }

    let index = 0;
    const updatedEmployees = employees
      .filter((employee) => employee.id !== Number.parseInt(id))
      .map((employee) => {
        index++;
        return {
          ...employee,
          id: index,
        };
      });

    await fs.writeFile(filePath, JSON.stringify(updatedEmployees));

    console.log("The employee deleted successfully");
  } catch (error) {
    console.error("Some thing wrong with message: ", error.message);
  }
}

module.exports = { deleteEmployee };
