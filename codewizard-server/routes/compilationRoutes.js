import express from 'express';
import { getCompiledOutput } from '../controllers/compilationController.js';

const router = express.Router();

router.post('/', getCompiledOutput);

export default router;