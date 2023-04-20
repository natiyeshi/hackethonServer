const jwt = require("jsonwebtoken");
const Company = require("../models/company");
const { promisify } = require("util");

const signup = async (req, res) => {
	try {
		const company = await Company.create(req.body);

		const token = jwt.sign({ id: company._id }, "your-secret-key-here", {
			expiresIn: "1h",
		}); 

		res.status(201).json({
			status: "success",
			token,
			company,
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: err,
		});
	}
};

const login = async (req, res) => {
	try {
	  const { email, password } = req.body;
  
	  if (!email || !password) {
		return res.status(400).json({
		  status: "fail",
		  message: "Please provide email and password",
		});
	  }
  
	  const company = await Company.findOne({ email }).select("+password");
  
	  if (!company || !(await company.correctPassword(password, company.password))) {
		return res.status(401).json({
		  status: "fail",
		  message: "Incorrect email or password",
		});
	  }
  
	  const token = jwt.sign({ id: company._id }, "your-secret-key-here", {
			  expiresIn: "1h",
		  });
  
  
	  res.status(200).json({
		status: "success",
		token,
		company,
	  });
  
	}catch(err) {
	  res.status(400).json({
		status: "fail",
		message: err,
	  });
	}
}
  
const protect = async (req, res, next) => {
	let token;
	if (
	  req.headers.authorization &&
	  req.headers.authorization.startsWith("Bearer")
	) {
	  token = req.headers.authorization.split(" ")[1];
	}
  
	if (!token) {
	  return res.status(401).json({
		status: "fail",
		message: "You are not logged in! Please log in to get access.",
	  });
	}
  
	try {
	  const decoded = await promisify(jwt.verify)(token,"your-secret-key-here"); 
	  const company = await Company.findById(decoded.id);
	  if (!company) {
		return res.status(401).json({
		  status: "fail", 
		  message: "The user belonging to this token does no longer exist.",
		});
	  }
  
	  req.company = company;
  
	  next();
	} catch (err) {
		
	  console.error(err);
	  res.status(401).json({
		status: "fail",
		message: "Invalid or expired token",
	  });
	}
};

module.exports = {
	login,signup,protect
}
