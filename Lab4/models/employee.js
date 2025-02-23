import mongoose from 'mongoose';

const employeeSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 8,
    validate: {
      validator(v) {
        return /^\S+$/.test(v);
      },
      message: (props) => `${props.value} mustn't contain spaces please try again!`
    }
  },
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
    validate: {
      validator(v) {
        return /^[A-Z]/.test(v);
      },
      message: (props) => `${props.value} should be capitalized please try again!`
    }
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
    validate: {
      validator(v) {
        return /^[A-Z]/.test(v);
      },
      message: (props) => `${props.value} should be capitalized please try again!`

    }
  },
  dob: {
    type: Date,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  }
}, {
  timestamps: true
});

const Employees = mongoose.model('Employees', employeeSchema);

export default Employees;
