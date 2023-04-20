const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Question = require("./questions");
const Job = require("./job");
   
const CompanySchema = new mongoose.Schema(
	{
		picture: {
			type: String,
		},
		name: {
			type: String,
			required: true,
		},
		about: {
			type: String,
			required: false,
		},
		tinNumber: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: false,
		},
		questions: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "Question",
			default: [],
		},
		jobs: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: Job,
			default: [],
		},
	},
	{ timestamps: true }
);

CompanySchema.virtual('fullName').get(function(){
  return `${this.firstName} ${this.lastName}`;
});

CompanySchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
console.log("password changed")
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});


CompanySchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

CompanySchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

CompanySchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  return false;
};



const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
