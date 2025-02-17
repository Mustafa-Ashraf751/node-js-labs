const fs = require("fs").promises;

const { createFile } = require("./create.js");
const { readAll, readById } = require("./read.js");
const { validateId } = require("./validateId.js");
const { editEmployee } = require("./update.js");
const { deleteEmployee } = require("./delete.js");

const [, , cmd, ...options] = process.argv;

function Main() {
  try {
    options.forEach((option) => {
      if (!option.startsWith("--")) {
        throw new Error("All options should start with -- please try again!");
      }
    });
    const result = {};
    options.forEach((option) => {
      const [key, value] = option.slice(2).split("=");
      if (!value) {
        throw new Error("All key must contains value please try again!");
      }
      result[key] = value;
    });

    if (cmd === "add") {
      createFile(result);
    } else if (cmd === "read") {
      if (result.id === undefined) {
        readAll();
      } else {
        validateId(result);
        readById(result.id);
      }
    } else if (cmd === "edit") {
      validateId(result);
      editEmployee(result);
    } else if (cmd === "delete") {
      validateId(result);
      deleteEmployee(result.id);
    }
  } catch (error) {
    console.error(error.message);
  }
}

Main();
