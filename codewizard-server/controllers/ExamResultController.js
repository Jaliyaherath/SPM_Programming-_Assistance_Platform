/**
 * ExamResultsController implementation
 */

import ExamResult from "../models/ExamResult.js";

/* Function to get all results */
const getResults = async (req, res) => {
  try {
    const allResults = await ExamResult.find().populate("studentID");

    if (allResults.length === 0) {
      res.status(201).json({
        message: "No results found",
        results: allResults,
      });
    } else if (allResults.length !== 0) {
      res.status(201).json({
        message: "Results found",
        results: allResults,
      });
    } else {
      res.status(400);
    }
  } catch (error) {
    console.log(error.message);
  }
};

/* Function to get a single result */
const getResult = async (req, res) => {
  try {
    const result = await ExamResult.find({ id: req.params.id }).populate(
      "studentID"
    );

    if (result[0]) {
      res.status(200).json({
        message: "Result found",
        results: result,
      });
    } else {
      res.status(400).json({
        message: "Result not found",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

/* Function to add a new result */
const addResult = async (req, res) => {
  try {
    const {
      examID,
      //   studentID,
      questionsAttempted,
      marks,
      grade,
      status,
    } = req.body;

    // Variable to hold the new id
    let newID;

    // Variable to hold the last document in the collection
    let lastDoc = await ExamResult.find().limit(1).sort({ $natural: -1 });

    if (lastDoc.length !== 0) {
      // Variable to hold the id of the last document in the collection
      let lastDocID = await lastDoc[0].id;

      // Increment the id by 1
      newID = lastDocID + 1;
    } else {
      // Assign 0 otherwise
      newID = 0;
    }

    const newResult = await new ExamResult({
      id: newID,
      examID,
      studentID: req.user,
      questionsAttempted,
      marks,
      grade,
      status,
    }).save();

    if (newResult) {
      res.status(201).json({
        message: "Result added successfully",
        results: newResult,
      });
    } else {
      res.status(400).json({
        message: "Failed to add result",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

/* Function to update a result */
const updateResult = async (req, res) => {
  try {
    const result = await ExamResult.find({ id: req.params.id });

    if (result) {
      const updatedResult = await ExamResult.findOneAndUpdate(
        {
          id: req.params.id,
        },
        {
          $set: {
            examID: req.body.examID,
            studentID: req.body.studentID,
            questionsAttempted: req.body.questionsAttempted,
            marks: req.body.marks,
            grade: req.body.grade,
            status: req.body.status,
          },
        },
        {
          new: true,
        }
      );

      if (updatedResult) {
        res.status(200).json({
          message: "Result updated successfully",
          results: updatedResult,
        });
      } else {
        res.status(400).json({
          message: "Result not found",
        });
      }
    } else {
      res.status(400).json({
        message: "Failed to update result",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

/* Function to delete a result */
const deleteResult = async (req, res) => {
  try {
    const deletedResult = await ExamResult.findOneAndDelete({
      id: req.params.id,
    });

    if (deletedResult) {
      res.status(200).json({
        message: "Result deleted successfully",
        results: deletedResult,
      });
    } else {
      res.status(400).json({
        message: "Failed to delete result",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const examResultController = {
  getResults,
  getResult,
  addResult,
  updateResult,
  deleteResult,
};

export default examResultController;
