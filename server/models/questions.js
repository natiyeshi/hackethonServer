const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true
  },
  questionDescription: {
    type: String,
    required: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
  }
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
