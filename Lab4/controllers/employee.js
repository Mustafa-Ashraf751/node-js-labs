import Employees from '../models/employee.js';

const createUser = async (data) => {
  const employee = Employees.create(data);
  return employee;
};

const getAll = async () => {
  const employees = Employees.find({}).exec();
  return employees;
};

export {
  createUser,
  getAll
};
