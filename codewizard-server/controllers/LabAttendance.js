// lab attendance

import LabSession from "../models/LabSession.js";

// Controller to get details of a specific lab session by ID
export const getLabSessionAttandanceById = async (req, res) => {
  try {
    const labSession = await LabSession.findById(req.params.labId, {enrolledStudents:1}).populate(
     { path: "enrolledStudents.user", select: "firstName lastName userRegNo"});
    // const labSession = await LabSession.findById(req.params.labId).populate("enrolledStudents.user")
    if (!labSession) {
      return res.status(404).json({ error: "Lab session not found" });
    }
    res.json(labSession);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch lab session" });
  }
};

export const getAllLabs = async (req, res) => {
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



export const getLabAttandanceById = async (req, res) => {
  try {
    const labSession = await LabSession.findById(req.params.labId);
    if (labSession) {
      res.status(201).json(labSession);
    } else {
      res.status(400);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};