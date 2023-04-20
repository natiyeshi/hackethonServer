const mongoose = require("mongoose"); 
const validator = require("validator"); 
const bcrypt = require("bcryptjs"); 
 
const Solution = require("./solutions")  
 
const StudentSchema = new mongoose.Schema( 
 { 
  email: { 
      type: String, 
      unique: [true, "email already exists in database!"], 
      required: [true, "please enter your email"], 
      match: [ 
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
        "Please add a valid email", 
      ], 
  }, 
  about: { 
      type: String, 
      required: false, 
  }, 
  skill: { 
      type: [String], 
      default: [], 
  }, 
  firstName: { 
      type: String, 
      required: [true, "please enter your first name"], 
      trim: true, 
  }, 
  lastName: { 
      type: String, 
      required: [true, "please enter your last name"], 
      trim: true, 
  }, 
  password: { 
      type: String, 
      required: true, 
  }, 
  resume: { 
      type: String, 
      required: false, 
  }, 
  picture: { 
      type: String, 
      required: false, 
  }, 
  portfolio: { 
      type: String, 
      required: false, 
  }, 
  category: { 
      type: String, 
      required: false 
  }, 
  solved: { 
      type : [ mongoose.Schema.Types.ObjectId], 
      default : [], 
      ref:"Solution" 
  }, 
  pending: { 
      type : [ mongoose.Schema.Types.ObjectId], 
      default : [], 
      ref:"Solution" 
  }, 
  failed: { 
      type : [ mongoose.Schema.Types.ObjectId], 
      default : [], 
      ref:"Solution" 
  }, 
 }, 
 { 
  timestamps: true, 
 } 
); 
 
 
 
StudentSchema.pre('save', async function(next) { 
    // Only run this function if password was actually modified 
    if (!this.isModified('password')) return next(); 
   
    // Hash the password with cost of 12 
    this.password = await bcrypt.hash(this.password, 12); 
   
    // Delete passwordConfirm field 
    this.passwordConfirm = undefined; 
    next(); 
  }); 
 
  StudentSchema.pre('save', function(next) { 
    if (!this.isModified('password') || this.isNew) return next(); 
   
    this.passwordChangedAt = Date.now() - 1000; 
    next(); 
  }); 
 
  StudentSchema.pre(/^find/, function(next) { 
    this.find({ active: { $ne: false } }); 
    next(); 
  }); 
 
StudentSchema.methods.correctPassword = async function( 
    candidatePassword, 
    userPassword 
  ) { 
    return await bcrypt.compare(candidatePassword, userPassword); 
  }; 
   
  StudentSchema.methods.changedPasswordAfter = function(JWTTimestamp) { 
    if (this.passwordChangedAt) { 
      const changedTimestamp = parseInt( 
        this.passwordChangedAt.getTime() / 1000, 
        10 
      ); 
   
      return JWTTimestamp < changedTimestamp; 
    } 
   
    return false; 
  }; 
   
 
 
const Student = mongoose.model("Student", StudentSchema); 
 
module.exports = Student;
