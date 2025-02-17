function validateId(result) {
  if (isNaN(result.id) || result.id < 0) {
    throw new Error("Invalid Id format please try again!");
  }
}

module.exports = { validateId };
