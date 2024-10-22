/**
 * ExamRoutes implementation
 */
import express from "express";
import examController from "../controllers/ExamController.js";

const router = express.Router();

// Handle GET request at "/all" URI
router.get("/", examController.getExams);

// Handle GET request at "/:id" URI
router.get("/:id", examController.getExam);

// Handle POST request at "/new" URI
router.post("/", examController.addExam);

// Handle POST request at "/new" URI to update an exam's status
router.put("/:id", examController.updateExamStatus);

// Handle PUT request at "/:id/questions" URI to add questions to an exam
router.put("/:id/questions", examController.addQuestions);

// Handle PUT request at "/:id/questions/remove" URI to remove a question from an exam
router.put("/:id/questions/remove", examController.removeQuestion);

// Handle PUT request at "/update/:id" URI
router.put("/update/:id", examController.updateExam);

// Handle DELETE request at "/:id" URI
router.delete("/:id", examController.deleteExam);

export default router;