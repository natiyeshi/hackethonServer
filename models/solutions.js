const mongoose = require("mongoose")

const solutionSchema = mongoose.Schema(
    {
        problemId: {
            type :  mongoose.Schema.Types.ObjectId, 
            ref : "question",
            required: true,
        },
        studentId: {
            type :  mongoose.Schema.Types.ObjectId, 
            ref : "student",
            required: true,
        },
        solution: {
            type: String,
            required: true,
        },
        status:{
            type : String,
            enum:{
                values : ['success',"pending","failed"],
            },
            default : "pending",
        }
        
    }
)




const Solution = mongoose.model("solution", solutionSchema);

module.exports = Solution;
