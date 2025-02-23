import express from 'express';
import {employeeController} from '../controllers/index.js';
import {validateEmployee} from '../validators/validateOptions.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    let employeeData = JSON.parse(data);
    const {name} = req.query;
    if (name) {
      employeeData = employeeData.filter((emp) => emp.name.toLowerCase() === name);
    }
    res.status(200).json(employeeData);
  } catch (error) {
    res.status(500).send(`Sorry something go wrong, ${error.message}`);
  }
});

router.get('/showPage', async (req, res) => {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    const employeeData = JSON.parse(data);
    res.status(200).render('employees', {employeeData});
  } catch (error) {
    res.status(500).send(`Sorry something go wrong, ${error.message}`);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    const employeeData = JSON.parse(data);
    const employee = employeeData.find(
      (emp) => emp.id === Number.parseInt(req.params.id)
    );
    if (!employee) {
      return res.status(404).json({error: 'Employee not found'});
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).send(`Sorry something go wrong, ${error.message}`);
  }
});

const validationMiddleware = (req, res, next) => {
  const isValid = validateEmployee(req.body);
  if (!isValid) {
    res.status(400).json({errors: validateEmployee.errors});
  }
  next();
};

router.post('/', validationMiddleware, async (req, res) => {
  try {
    const data = req.body;
    try {
      await fs.access(dataPath);
    } catch {
      await fs.writeFile(dataPath, '[]', 'utf-8');
    }
    const employees = await fs.readFile(dataPath, 'utf-8');
    const array = JSON.parse(employees);
    const employee = {
      id: array.length + 1,
      ...data
    };
    array.push(employee);
    await fs.writeFile(dataPath, JSON.stringify(array, null, 2), 'utf-8');
    res.status(201).json(data);
  } catch (error) {
    res.status(500).send(`Sorry something go wrong, ${error.message}`);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    const employeeData = JSON.parse(data);
    const employee = employeeData.find(
      (emp) => emp.id === Number.parseInt(req.params.id)
    );
    if (!employee) {
      return res.status(404).json({error: 'Employee not found'});
    }
    const updatedEmployees = employeeData.filter((emp) => emp.id !== Number.parseInt(req.params.id));
    await fs.writeFile(dataPath, JSON.stringify(updatedEmployees, null, 2), 'utf-8');
    res.status(200).json({message: 'Employee deleted successfully'});
  } catch (error) {
    res.status(500).send(`Sorry something go wrong, ${error.message}`);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    const employeeData = JSON.parse(data);
    const employee = employeeData.find(
      (emp) => emp.id === Number.parseInt(req.params.id)
    );
    if (!employee) {
      return res.status(404).json({error: 'Employee not found'});
    }

    // User validate employee if I want to use fixed schema
    const updatedEmployees = employeeData.map((emp) => {
      if (emp.id === Number.parseInt(req.params.id)) {
        emp = {
          ...emp,
          ...req.body
        };
      }
      return emp;
    });
    await fs.writeFile(dataPath, JSON.stringify(updatedEmployees, null, 2), 'utf-8');
    res.status(204).json({message: 'Employee updated successfully'});
  } catch (error) {
    res.status(500).send(`Sorry something go wrong, ${error.message}`);
  }
});

export default router;
