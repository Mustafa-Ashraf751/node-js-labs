const fs = require("fs").promises;
const fsSync = require("fs");
const path = require("path");
const { validateOptions } = require("./validateOptions");
const filePath = path.join(__dirname, "data.json");
const { checkFileAndData } = require("./checkforFileAndData");

async function editEmployee(result) {
  try {
    const employees = await checkFileAndData(fsSync, filePath, fs);

    validateOptions(result);

    const employeeExists = employees.some(
      (emp) => emp.id === Number.parseInt(result.id)
    );

    if (!employeeExists) {
      throw new Error(`Sorry the employee with id ${result.id} not found!`);
    }

    const updatedEmployees = employees.map((employee) => {
      if (employee.id === Number.parseInt(result.id)) {
        return {
          ...employee,
          ...result,
          id: employee.id,
        };
      }
      return employee;
    });

    await fs.writeFile(filePath, JSON.stringify(updatedEmployees));

    console.log("The employee updated successfully");
  } catch (error) {
    console.error("Some thing wrong with message: ", error.message);
  }
}

module.exports = { editEmployee };
