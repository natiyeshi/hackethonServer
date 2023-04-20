const express = require("express");
const router = express.Router();
const studController = require("../controllers/studController");
const {protect} = require("../controllers/authController");

router.patch(
	"/update",
	protect,
	studController.upload.fields([
		{ name: "picture", maxCount: 1 },
		{ name: "resume", maxCount: 1 },
	]),
	studController.updateStud
);
 
// get questions
router.get("/getAllQuestions",protect,async (req,res)=>{ 
	try { 
	  const data = await studController.getAllQuestions() 
	  res.json(data) 
	}catch(err){ 
	  console.log(err) 
	  res.status(400) 
	} 
  })


router.get("/getPosts",protect,async (req,res)=>{ 
	try { 
		const data = await studController.getPosts() 
		if (data == false) throw "something goes wrong"
		res.json(data) 
	}catch(err){ 
		console.log(err) 
		res.status(400) 
	} 
})
  

// submit questions
router.post("/subSolution/:id",protect,async (req,res) =>{  
	// ## 
	const {solution} = req.body 
	const {_id} = req.student 
	try{ 
	  let data = await studController.insertSolutions(req.params.id,_id,solution) 
	  res.send(data) 
	}catch(err){ 
	  res.status(400).send(true) 
	} 
})

//
router.post("/getStudentSubmition",protect,async (req,res) =>{ 
	const {_id} = req.student
	try{
	  let data = await studController.getStudentSubmitions(_id)
	  res.send(data)
	}catch(err){
	  res.status(400).send(true)
	}
})



module.exports = router;
