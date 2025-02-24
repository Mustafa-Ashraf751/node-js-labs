import express from 'express';
import { leavesController } from "../controllers/index.js";

const router = express.Router();

router.post('/',async (req,res)=>{
  const leave = await leavesController.createLeave(req.body);
  res.status(201).json(leave);
});

router.patch('/:id', async (req,res)=>{
  const updatedLeave = await leavesController.updateLeave(req.params.id,req.body);
  res.json(updatedLeave);
})

router.get('/',async (req,res)=>{
  let leaves = await leavesController.getAll();
  const limit = req.query.limit || 10;
  const skip = req.query.skip || 0;
  const status = req.query.status;
  leaves = leaves.skip(skip).limit(limit);
  if(status){
    leaves = leaves.filter((leave)=>leave.status===status);
  }
  res.json(leaves);
})

export default router;