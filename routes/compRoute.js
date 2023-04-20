const express = require("express");
const router = express.Router();
const {protect} = require("../controllers/companyAuth");
const campController = require("../controllers/campController")

router.post("/insertQuestion",protect,async (req,res) =>{  
    // ###  finished  ###
    let { _id } = req.company 
    req.body.companyId = _id
    console.log(req.body," ---- ")

    try { 
      let data = await campController.insertQuestion(req.body,_id) 
      if (data == false) throw "something goes wrong" 
      res.send(data) 
    }catch(err){ 
      console.log(err) 
      res.status(404).send("error") 
    }  
     
})

router.get("/getCompanyQuestions",protect,async (req,res)=>{ 
    // ###  finished  ###
    const { _id } = req.company  
    try { 
      const data = await campController.getCompanyQuestions(_id) 
      res.json(data) 
   
     }catch(err) { 
        res.status(400).send(false) 
     } 
})

router.post("/getSolution/:problemId",protect,async (req,res)=>{
  // ###  finished  ###
  try {
    const data = await campController.getSolution(req.params.problemId)
    res.json(data)
  }catch(err ){
    res.status(400).json(err)
  }

})

router.post("/changeSolutionStatus/",protect,async (req,res)=>{
  const { status,solutionId } = req.body
  try {
    const data = await campController.updateSolution(solutionId,status)
    res.json(data)
  } catch(err ){
    res.status(400).send(err)
  }

})

router.post("/postJob",protect,async (req,res) =>{
  const { _id } = req.company
  req.body.companyId = _id
  try {
    let data = await campController.postJob(req.body)
    res.json(data)
  }catch(err){
    console.log(err)
    res.status(400).send("something goes wrong")
  }
  
})



module.exports = router;