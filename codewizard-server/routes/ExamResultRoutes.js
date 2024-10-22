/**
 * ExamResultRoutes implementation
 */
import express from "express";
import examResultController from "../controllers/ExamResultController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Handle GET request at "/" URI
router.get("/", examResultController.getResults);

// Handle GET request at "/:id" URI
router.get("/:id", examResultController.getResult);

// Handle POST request at "/" URI
router.post("/", verifyToken, examResultController.addResult);

// Handle PUT request at "/:id" URI
router.put("/:id", examResultController.updateResult);

// Handle DELETE request at "/:id" URI
router.delete("/:id", examResultController.deleteResult);

export default router;
