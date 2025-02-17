async function checkFileAndData(fsSync, filePath, fs) {
  if (!fsSync.existsSync(filePath)) {
    throw new Error("No thing to update please insert some data!");
  }

  let fileIsEmpty = false;

  const data = await fs.readFile(filePath, "utf8");
  if (data.trim() === "") {
    fileIsEmpty = true;
    throw new Error("No thing to update please insert some data!");
  }

  if (!fileIsEmpty) {
    const data = await fs.readFile(filePath, "utf8");
    employees = JSON.parse(data);
  }
  return employees;
}

module.exports = { checkFileAndData };
