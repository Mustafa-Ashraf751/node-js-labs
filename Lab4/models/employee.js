import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import profileSchema from './profile.js';

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
  },
  profile: profileSchema
}, {
  timestamps: true
});

employeeSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 12);
  next();
});

employeeSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, {__v, password, ...rest}, options) => rest
});

employeeSchema.methods.comparePasswords = function (password) {
  return bcrypt.compareSync(password, this.password);
};

employeeSchema.virtual('age').get(function () {
  const today = new Date();
  const birthDate = new Date(this.dob);
  const age = today.getFullYear() - birthDate.getFullYear();
  return age;
});

const Employees = mongoose.model('Employees', employeeSchema);
export default Employees;
