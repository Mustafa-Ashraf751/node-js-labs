import Employees from '../models/employee.js';
import Leaves from '../models/leaves.js';
import {AppError} from '../middleware/AppError.js';

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
    throw new AppError('employee not found', 404) ;
   }
  return employee;
};

const patchById = async (id, data) => {
  const employee = await Employees.findByIdAndUpdate(id, data,{runValidators: true});
  if (!employee) {
    throw new AppError('employee not found', 404);
  }
  return employee;
};

const deleteById = async (id) => {
  const employee = await Employees.findByIdAndDelete(id).exec();
  if (!employee) {
    throw new AppError('employee not found', 404) ;
  }
};

const getLeavesByEmployeeId = async(id)=>{
  const leaves = Leaves.find({empId:id});
  if(!leaves){
    return next(new AppError('No leaves found!',404));
  }
  return leaves;
}

export {
  createEmployee,
  deleteById,
  getAll,
  getById,
  patchById,
  getLeavesByEmployeeId
};
