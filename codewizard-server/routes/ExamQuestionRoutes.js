/**
 * ExamQuestionRoutes implementation
 */
import express from "express";
import examQuestionController from "../controllers/ExamQuestionController.js";

const router = express.Router();

// Handle GET request at "/all" URI
router.get("/", examQuestionController.getQuestions);

// Handle GET request at "/:id" URI
router.get("/:id", examQuestionController.getQuestion);

// Handle POST request at "/new" URI
router.post("/", examQuestionController.addQuestion);

// Handle PUT request at "/:id" URI
router.put("/:id", examQuestionController.updateQuestion);

// Handle DELETE request at "/:id" URI
router.delete("/:id", examQuestionController.deleteQuestion);

export default router;