import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  empId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'Employees'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  yearOfExperience: {
    type: Number,
    default: 0
  },
  department: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i, 'Please enter a valid email address']
  }
});

export default profileSchema;
