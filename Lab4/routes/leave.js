import express from 'express';
import {leavesController} from '../controllers/index.js';
import {AppError} from '../middleware/AppError.js';
import {authenticate} from '../middleware/authentication.js';

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
  const employeeId = req.user._id;
  const newLeave = {
    ...req.body,
    empId: employeeId
  };
  const leave = await leavesController.createLeave(newLeave);
  res.status(201).json(leave);
});

router.patch('/:id', authenticate, async (req, res) => {
  const updatedLeave = await leavesController.updateLeave(req.params.id, req.body);
  if (updatedLeave.empId.toString() !== req.user._id) throw new AppError('Access Denied please try again!', 403);
  res.json(updatedLeave);
});

router.get('/', authenticate, async (req, res) => {
  const limit = Number.parseInt(req.query.limit) || 10;
  const skip = Number.parseInt(req.query.skip) || 0;
  const status = req.query.status;
  const leaves = await leavesController.getAll(skip, limit, status, req.user._id);
  res.json(leaves);
});

export default router;
