import mongoose, {Schema} from 'mongoose';

const leavesSchema = new Schema({
  empId: {
    type:Schema.Types.ObjectId,
    required: true,
    ref:'Employees'
  },
  type: {
    type: String,
    enum: ['annual', 'casual', 'sick']
  },
  duration: {
    type: Number,
    min: [1, 'Duration must be at least one day'],
    required: true
  },
  status: {
    type: String,
    enum: ['inprogress', 'cancelled', 'ended'],
    default: 'inprogress'
  }
}, {timestamps: true});

const Leaves = mongoose.model('Leaves', leavesSchema);

export default Leaves;
