import process from 'node:process';
import JWT from 'jsonwebtoken';
import {AppError} from '../middleware/AppError.js';
import Employees from '../models/employee.js';
import Leaves from '../models/leaves.js';

const loginUser = async (data) => {
  const {username, password} = data;
  const user = await Employees.findOne({username}).exec();
  if (!user) {
    throw new AppError('Invalid username or password try again!', 401);
  }
  const validPassword = user.comparePasswords(password);
  if (!validPassword) {
    throw new AppError('Invalid username or password try again!', 401);
  }
  const jwt = JWT.sign({_id: user._id}, process.env.JWT_SECRET);
  return jwt;
};

const createEmployee = async (data) => {
  const employee = await Employees.create(data);
  return employee;
};

const getAll = async () => {
  const employees = await Employees.find()
    .select('_id firstName age')
    .exec();
  return employees;
};

const getById = async (id) => {
  const employee = await Employees.findById(id).exec();
  if (!employee) {
    throw new AppError('employee not found', 404);
  }
  return employee;
};

const patchById = async (id, data) => {
  const employee = await Employees.findByIdAndUpdate(id, data, {runValidators: true});
  if (!employee) {
    throw new AppError('employee not found', 404);
  }
  return employee;
};

const deleteById = async (id) => {
  const employee = await Employees.findByIdAndDelete(id).exec();
  if (!employee) {
    throw new AppError('employee not found', 404);
  }
};

const getLeavesByEmployeeId = async (id) => {
  const leaves = await Leaves.find({empId: id});
  if (!leaves) {
    throw new AppError('No leaves found!', 404);
  }
  return leaves;
};

export {
  createEmployee,
  deleteById,
  getAll,
  getById,
  getLeavesByEmployeeId,
  loginUser,
  patchById
};
