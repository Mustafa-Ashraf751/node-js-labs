import express from 'express';
import {employeeController} from '../controllers/index.js';


const router = express.Router();

router.get('/', async (req, res) => {
  let employeeData = await employeeController.getAll();
  const {firstName} = req.query;
  if (firstName) {
    employeeData = employeeData.filter((emp) => emp.firstName.toLowerCase() === firstName);
  }
  res.json(employeeData);
});

router.get('/:id', async (req, res) => {
  const employee = await employeeController.getById(req.params.id);
  res.json(employee);
});

router.post('/', async (req, res) => {
    const data = req.body;
    const employees = await employeeController.createEmployee(data);
    res.status(201).json(employees);
});

router.delete('/:id', async (req, res) => {
    const employee = employeeController.deleteById(req.params.id);
    res.json({message: 'Employee deleted successfully'});
});

router.patch('/:id', async (req, res) => {
    const employee = await employeeController.patchById(req.params.id, req.body);
    res.json(employee);
});

router.get('/:id/leave',(req,res)=>{
  const leaves = employeeController.getLeavesByEmployeeId(req.params.id);
  res.json(leaves);
})

export default router;
