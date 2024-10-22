/**
 * Model for ExamResult
 */
import mongoose from "mongoose";

const ExamResultSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  examID: {
    type: Number,
    required: true,
    ref: "Exam",
  },
  // studentID: {
  //     type: Number,
  //     required: true,
  //     ref: "Student",
  // },
  studentID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  questionsAttempted: {
    type: Number,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  // grade: {
  //   type: String,
  //   required: true,
  // },
  status: {
    type: String,
    required: true,
  },
  attemptedDate: {
    type: Date,
    default: new Date(),
  },
});

const ExamResult = mongoose.model("ExamResult", ExamResultSchema);

export default ExamResult;
