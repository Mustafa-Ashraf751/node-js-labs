import Ajv from 'ajv';
import ajvFormats from 'ajv-formats';

const ajv = new Ajv(
  {
    useDefaults: true
  }
);
ajvFormats(ajv);

const employeeSchema = {
  type: 'object',
  properties: {
    name: {type: 'string', minLength: 1, maxLength: 30},
    email: {type: 'string', format: 'email'},
    salary: {type: 'number', minimum: 1000},
    levels: {
      type: 'string',
      enum: ['JR', 'Mid-Level', 'SR', 'Lead'],
      default: 'JR'
    },
    years: {type: 'number', minimum: 0, default: 0}
  },
  required: ['name', 'email', 'salary']
};

export const validateEmployee = ajv.compile(employeeSchema);
