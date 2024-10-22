/**
 *  Lab Session Controller
 * TODO: add authentication to createLabSession only instructor can create a lab session
 * TODO: save the lab instructor id in the lab
 *  TODO : update and delete lab session
 */

import Forum from "../models/ForumModels/Forum.js";
import LabSession from "../models/LabSession.js";
import bcrypt from "bcrypt";

/* Function to get all lab sessions */
/* @route   GET /api/lab */
export const getLabSessions = async (req, res) => {
  try {
    const allLabSessions = await LabSession.find();
    if (allLabSessions) {
      res.status(201).json(allLabSessions);
    } else {
      res.status(400);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Function to create a lab session */
/* @route   POST /api/lab */
export const createLabSession = async (req, res) => {
  try {
    const { password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newLabSession = new LabSession({
      ...req.body,
      password: passwordHash,
    });
    const savedLabSession = await newLabSession.save();
    const forum = new Forum({
      labSession: savedLabSession._id,
    });
    await forum.save();
    res.status(201).json(savedLabSession);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Function to enroll a student to a lab session */
/* @route   POST /api/lab/:labId/enroll */

export const enrollStudent = async (req, res) => {
  try {
    const { labId } = req.params;
    const { password } = req.body;
    const studentId = req.user;
    const labSession = await LabSession.findById(labId);
    if (labSession) {
      const studentAlreadyEnrolled = labSession.enrolledStudents.find(
        (student) => student._id.toString() === studentId
      );
      if (studentAlreadyEnrolled) {
        return res.status(400).json({ error: "Student already enrolled" });
      }
      const isMatch = await bcrypt.compare(password, labSession.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid password" });
      }
      // labSession.enrolledStudents.push(studentId);
      const updatedLabSession = await labSession.markAttendance(studentId);
  
      res.status(201).json(updatedLabSession);


    } else {
      res.status(404).json({ error: "Lab session not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
