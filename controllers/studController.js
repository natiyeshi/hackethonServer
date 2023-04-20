const Student = require("../models/students");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const Questions = require("../models/questions");
const Solutions = require("../models/solutions");
const Jobs = require("../models/job");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + "-" + Date.now());
	},
});

const upload = multer({ storage: storage });

const updateStud = async (req, res) => {
	try {
		const id = req.student.id;
		let imageUrl = "";

		if (req.files.picture) {
			const result = await cloudinary.uploader.upload(
				req.files.picture[0].path,
				{
					folder: "student",
				}
			);
			req.body.picture = result.secure_url;
		}

		if (req.files.resume) {
			const result = await cloudinary.uploader.upload(
				req.files.resume[0].path,
				{
					folder: "student",
				}
			);
			req.body.resume = result.secure_url;
		}

		const student = await Student.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({
			status: "success",
			student,
		});
	} catch (err) {
		console.log(err);
		return res.send(false);
	}
};

const getAllQuestions = async () => { 
 
    try { 
        const data = await Questions.find() 
        return data 
    } catch( err ){ 
        return false 
    } 
 
}

const insertSolutions = async (problemId,studentId,solution,) =>{ 
    try{ 
        const res = await Solutions.create({problemId,studentId,solution}) 
		console.log("res")
        if (res._id == null) throw "can't create solution" 
		const data = await Student.findByIdAndUpdate(studentId,{$push:{pending:res._id}},{new:true})
        return [res,data] 
 
    }catch(err ){ 
        console.log(err) 
        return false 
    } 
}

const getStudentSubmitions = async (_id) => {
    try {
        let res = await Solutions.find({studentId:_id})
        return res
    }catch(err ){
        console.log(err)
        return false
    }
}

const getPosts = async (_id) =>{
	try{
		const data = await Jobs.find()
		return data
	}catch(err){
		return false
	}
}

module.exports = {
	updateStud,
	upload,
	getAllQuestions,
	insertSolutions,
	getStudentSubmitions,
	getPosts
};
  