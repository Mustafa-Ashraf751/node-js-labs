import express from 'express';
import {leavesController} from '../controllers/index.js';
import {authenticate} from '../middleware/authentication.js';

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
  const leave = await leavesController.createLeave(req.body);
  res.status(201).json(leave);
});

router.patch('/:id', authenticate, async (req, res) => {
  const updatedLeave = await leavesController.updateLeave(req.params.id, req.body);
  res.json(updatedLeave);
});

router.get('/', authenticate, async (req, res) => {
  const limit = Number.parseInt(req.query.limit) || 10;
  const skip = Number.parseInt(req.query.skip) || 0;
  const status = req.query.status;
  const leaves = await leavesController.getAll(skip, limit, status);
  console.log(req.user);
  res.json(leaves);
});

export default router;
