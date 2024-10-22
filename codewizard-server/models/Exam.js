/**
 * Model for Exam
 */
import mongoose from "mongoose";

const ExamSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    noOfQuestions: {
        type: Number,
        default: 0
    },
    duration: {
        type: String,
        required: true
    },
    questionsList: {
        type: Array,
        default: []
    },
    passMark: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: new Date()
    }
});

const Exam = mongoose.model("Exam", ExamSchema);

export default Exam;