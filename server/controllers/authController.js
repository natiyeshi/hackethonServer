const jwt = require("jsonwebtoken");
const Student = require("../models/students");
const {promisify} = require("util");

exports.signup = async (req, res) => {
	try {

		const student = await Student.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password,
		});

		const token = jwt.sign({ id: student._id }, "your-secret-key-here", {
			expiresIn: "1h",
		});

		res.status(201).json({
			status: "success",
			token,
			student,
		});

	} catch (err) {
		
    res.status(400).json({
			status: "fail",
			message: err,
		});
    
	}
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email and password",
      });
    }

    const student = await Student.findOne({ email }).select("+password");

    if (!student || !(await student.correctPassword(password, student.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }

    const token = jwt.sign({ id: student._id }, "your-secret-key-here", {
			expiresIn: "1h",
		});


    res.status(200).json({
      status: "success",
      token,
      student,
    });

  }catch(err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
}

exports.protect = async (req, res, next) => {
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
    const student = await Student.findById(decoded.id);
    if (!student) {
      return res.status(401).json({
        status: "fail", 
        message: "The user belonging to this token does no longer exist.",
      });
    }

    req.student = student;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({
      status: "fail",
      message: "Invalid or expired token",
    });
  }
};