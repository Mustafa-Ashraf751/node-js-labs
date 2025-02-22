import express from 'express';
import employeeRoute from './employee.js';

const router = express.Router();

router.use('/employees', employeeRoute);

export default router;
