import express from 'express';
import employeeRoute from './employee.js';
import leaveRoute from './leave.js';

const router = express.Router();

router.use('/employees', employeeRoute);
router.use('/leave',leaveRoute);

export default router;
