import { AppError } from '../middleware/AppError.js';
import Leaves from '../models/leaves.js'

const createLeave = async (data)=>{
  const leave = await Leaves.create(data);
  return leave;
}

const updateLeave = async (id,data)=>{
  const allowedKeys = ['type','duration','status'];
  const dataKeys = Object.keys(data);
  const invalidKeys = dataKeys.filter((key)=>!allowedKeys.includes(key));
  if(invalidKeys.length > 0){
    throw new AppError(`Invalid keys detected: ${invalidKeys.join(', ')}`,422);
  }
  const updatedLeave = await Leaves.findByIdAndUpdate(id,data,{runValidators:true});
  if(!updatedLeave){
    throw new AppError('Leave not found try again!',404);
  }
  return updatedLeave;
}

const getAll = async ()=>{
  const leaves = await Leaves.find({});
  if(!leaves){
    throw new AppError('No leaves found please try again!',404);
  }
  return leaves;
}

export {
  createLeave,
  updateLeave,
  getAll
}