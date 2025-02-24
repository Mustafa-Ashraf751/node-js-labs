import mongoose, {Schema} from 'mongoose';

const profileSchema = new Schema({
  empId: {
    type:Schema.Types.ObjectId,
    required:true,
    unique:true,
    ref:'Employees'
  },
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  yearOfExperience:{
    default:0
  },
  department:{
    type:String,
    required:true
  },
  phone:{
    type:String,
    required:true
  },email:{
    required:true,
    unique:true,
    match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please enter a valid email address']
  }
});

const Profiles = mongoose.model('Profiles',profileSchema);

export default Profiles;