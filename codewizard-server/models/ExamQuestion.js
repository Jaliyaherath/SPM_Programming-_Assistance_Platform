/**
 * Model for Question
 */
import mongoose from "mongoose";

const QuestionSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    examID: {
        type: Number,
        required: true,
        ref: "Exam"
    },
    content: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        default: ""
    },
    option1: {
        type: String,
        required: true
    },
    option2: {
        type: String,
        required: true
    },
    option3: {
        type: String,
        required: true
    },
    option4: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

const ExamQuestion = mongoose.model("ExamQuestion", QuestionSchema);
export default ExamQuestion;