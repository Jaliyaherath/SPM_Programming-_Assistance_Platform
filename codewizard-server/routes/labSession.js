import express from "express";
import {
  getLabSessions,
  createLabSession,
  enrollStudent,
} from "../controllers/labSession.js";

const router = express.Router();

router.get("/", getLabSessions);
router.post("/", createLabSession);

router.post("/:labId/enroll", enrollStudent);

export default router;
