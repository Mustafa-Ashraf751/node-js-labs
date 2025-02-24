import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


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
  timestamps: true,
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
});




employeeSchema.pre('save',function(next){
  this.password = bcrypt.hashSync(this.password,12);
  next();
});



employeeSchema.set('toJSON',{
  transform:(doc,{__v,password,...rest},options)=>rest
})

employeeSchema.virtual('age').get(function(){
  const today = new Date();
  const birthDate = new Date(this.dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  console.log(age);
  return age;
})

const Employees = mongoose.model('Employees', employeeSchema);
export default Employees;
