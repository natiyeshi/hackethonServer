const Student = require("../models/students"); 
const Company = require("../models/company"); 
const Question = require("../models/questions"); 
const Solution = require("../models/solutions"); 
const Job = require("../models/job"); 
 
const insertQuestion = async (data,_id) =>{ 
    try { 
        let res = await Question.create({...data}) 
        await Company.updateOne({_id},{$push:{questions:res._id}}) 
        return  res
    }
    catch(err){  
        console.log(err) 
        return false
    } 
} 
 
const getCompanyQuestions = async (_id) =>{ 
    try { 
        const data = await Company.findOne({_id}).populate('questions') 
        
        return data.questions 
    }catch(err ){ 
        console.log(err)
        return false 
    } 
} 

const getSolution = async (problemId) =>{
    try {
        const res = await Solution.find({problemId})
        return res
    }catch(err ){
        console.log(err)
        return false
    }
} 

const updateSolution = async (solutionId,newStatus) =>{ 
    try{
        const res = await Solution.findByIdAndUpdate(solutionId,{$set:{status:newStatus}})
        let data
        if (newStatus == "solved"){ 
             data = await Student.findByIdAndUpdate(res.studentId,{$pull: {pending:solutionId}})
             data = await Student.findByIdAndUpdate(res.studentId,{$push: {solved:solutionId}}
            )
        } else{
             data = await Student.findByIdAndUpdate(res.studentId,{$pull: {pending:newStatus}})
             data = await Student.findByIdAndUpdate(res.studentId,{$pull: {failed:newStatus}})
        }
        return data
    }catch(err ){
        console.log(err)
        return false
    }
}

const postJob = async (files) =>{
    try{
        const res = await Job.create(files)
        const data = await Company.findByIdAndUpdate(files.companyId,{$push:{jobs:res._id}})
        return [res,data]
    }catch(err ){
        console.log(err)
        return err
    }

}


module.exports = { 
    insertQuestion,getCompanyQuestions,
    getSolution,updateSolution,postJob
}