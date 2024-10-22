import express from "express";
import {
    getLabSessionAttandanceById,
    getAllLabs,
    getLabAttandanceById,
} from "../controllers/LabAttendance.js";

const router = express.Router();


// Route to get details of a specific lab session by ID
router.get("/reports/labattendance/:labId", getLabSessionAttandanceById);

router.get("/reports/labattendance",getAllLabs);

//get only lab details
router.get("/reports/:labId", getLabAttandanceById);



export default router;
