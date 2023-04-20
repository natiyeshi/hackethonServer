const mongoose = require('mongoose');

const jobSchema  = new mongoose.Schema({
   
    title: {
        type: String, 
        required: true,
    },
    tag: {
        type: String,
        required: true
    },
    desc: {
        type:String,
        required : false
    },
    numberOfIntern: {
        type: Number,
        required: true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    },
    questions:{
        type : [ mongoose.Schema.Types.ObjectId],
        default : [],
        ref:"Question"
    },
    appliers:{
        type : [ mongoose.Schema.Types.ObjectId],
        default : [],
        ref:"Question"
    }
},{timestamps:true})

const Jobs = mongoose.model("job", jobSchema);

module.exports = Jobs