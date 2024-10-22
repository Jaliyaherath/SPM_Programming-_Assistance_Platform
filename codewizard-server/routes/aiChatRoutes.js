import express from "express";
import { getAICommentorRespose, getAiChatResponse } from "../controllers/aiChatController.js";

const router = express.Router();

router.post("/", getAiChatResponse);
router.post("/commentor", getAICommentorRespose);

export default router;