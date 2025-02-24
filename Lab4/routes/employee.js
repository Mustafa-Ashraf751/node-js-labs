import express from 'express';
import {employeeController} from '../controllers/index.js';
import {authenticate} from '../middleware/authentication.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const token = await employeeController.loginUser(req.body);
  res.json({token});
});

router.get('/', authenticate, async (req, res) => {
  let employeeData = await employeeController.getAll();
  const {firstName} = req.query;
  if (firstName) {
    employeeData = employeeData.filter((emp) => emp.firstName.toLowerCase() === firstName);
  }
  res.json(employeeData);
});

router.get('/:id', authenticate, async (req, res) => {
  const employee = await employeeController.getById(req.params.id);
  res.json(employee);
});

router.post('/', authenticate, async (req, res) => {
  const data = req.body;
  const employees = await employeeController.createEmployee(data);
  res.status(201).json(employees);
});

router.delete('/:id', authenticate, async (req, res) => {
  await employeeController.deleteById(req.params.id);
  res.json({message: 'Employee deleted successfully'});
});

router.patch('/:id', authenticate, async (req, res) => {
  const employee = await employeeController.patchById(req.params.id, req.body);
  res.json(employee);
});

router.get('/:id/leaves', authenticate, async (req, res) => {
  const leaves = await employeeController.getLeavesByEmployeeId(req.params.id);
  res.json(leaves);
});

export default router;
