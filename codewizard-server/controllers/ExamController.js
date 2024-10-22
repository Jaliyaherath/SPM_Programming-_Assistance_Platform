/**
 * ExamController implementation
 */

import Exam from "../models/Exam.js";

/* Function to get all exams */
const getExams = async (req, res) => {
    try {
        const allExams = await Exam.find();

        if (allExams.length === 0) {
            res.status(201).json({
                message: "No questions found",
                exams: allExams
            });
        } else if (allExams.length !== 0) {
            res.status(201).json({
                message: "Exams found",
                exams: allExams
            });
        } else {
            res.status(400);
        }

    } catch (error) {
        console.log(error.message);
    }
};

/* Function to get a single exam */
const getExam = async (req, res) => {

    try {
        const exam = await Exam.find({ id: req.params.id });

        if (exam[0]) {
            res.status(200).json({
                message: "Exam found",
                exams: exam
            });
        } else {
            res.status(400).json({
                message: "Exam not found",
            });
        }

    } catch (error) {
        console.log(error.message);
    }

};

/* Function to add a new exam */
const addExam = async (req, res) => {

    try {
        const {
            code,
            title,
            description,
            year,
            semester,
            duration,
            passMark,
            password
        } = req.body;

        // Variable to hold the new id
        let newID;

        // Variable to hold the last document in the collection
        let lastDoc = await Exam.find().limit(1).sort({ $natural: -1 });

        if (lastDoc.length !== 0) {
            // Variable to hold the id of the last document in the collection
            let lastDocID = await lastDoc[0].id;

            // Increment the id by 1
            newID = lastDocID + 1;
        } else {
            // Assign 0 otherwise
            newID = 0;
        }

        const newExam = await new Exam({
            id: newID,
            code,
            title,
            description,
            year,
            semester,
            duration,
            passMark,
            password
        }).save();

        if (newExam) {
            res.status(201).json({
                message: "Exam added successfully",
                exam: newExam
            });
        } else {
            res.status(400).json({
                message: "Failed to add exam"
            });
        }

    } catch (error) {
        console.log(error.message);
    }
}

/* Function to add questions to an exam*/
const addQuestions = async (req, res) => {
    try {
        const exam = await Exam.find({ id: req.params.id });

        if (exam) {
            let newQuestionsList = exam[0].questionsList.concat(req.body.items);

            let existingNoofQuestions = exam[0].noOfQuestions;

            const updatedExam = await Exam.findOneAndUpdate(
                {
                    id: req.params.id
                },
                {
                    $set: {
                        questionsList: newQuestionsList,
                        noOfQuestions: existingNoofQuestions + req.body.items.length
                    }
                },
                {
                    new: true
                }
            );

            if (updatedExam) {
                res.status(200).json({
                    message: "Questions added successfully",
                    exams: updatedExam
                });
            } else {
                res.status(400).json({
                    message: "Exam not found"
                });
            }
        } else {
            res.status(400).json({
                message: "Failed to add questions"
            });
        }

    } catch (error) {
        console.log(error.message);
    }
};

/* Function to remove questions from an exam*/
const removeQuestion = async (req, res) => {
    try {
        const exam = await Exam.find({ id: req.params.id });

        if (exam) {

            const questionToBeRemovedIndex = req.body.questionToBeRemovedIndex;

            await exam[0].questionsList.splice(questionToBeRemovedIndex, 1);

            const updatedExam = await Exam.findOneAndUpdate(
                {
                    id: req.params.id
                },
                {
                    $set: {
                        questionsList: exam[0].questionsList,
                        noOfQuestions: exam[0].questionsList.length
                    }
                },
                {
                    new: true
                }
            );


            if (updatedExam) {
                res.status(200).json({
                    message: "Question removed successfully",
                    exams: updatedExam
                });
            } else {
                res.status(400).json({
                    message: "Exam not found"
                });
            }
        } else {
            res.status(400).json({
                message: "Failed to remove question"
            });
        }

    } catch (error) {
        console.log(error.message);
    }
}

/* Function to update an exam */
const updateExam = async (req, res) => {
    try {
        const exam = await Exam.find({ id: req.params.id });

        if (exam) {
            const updatedExam = await Exam.findOneAndUpdate(
                {
                    id: req.params.id
                },
                {
                    $set: {
                        code: req.body.code,
                        title: req.body.title,
                        description: req.body.description,
                        year: req.body.year,
                        semester: req.body.semester,
                        duration: req.body.duration,
                        passMark: req.body.passMark,
                        password: req.body.password
                    }
                },
                {
                    new: true
                }
            );

            console.log(updatedExam);

            if (updatedExam) {
                res.status(200).json({
                    message: "Exam updated successfully",
                    exams: updatedExam
                });
            } else {
                res.status(400).json({
                    message: "Exam not found"
                });
            }
        } else {
            res.status(400).json({
                message: "Failed to update exam"
            });
        }


    } catch (error) {
        console.log(error.message);
    }

};

/* Function to update exam status */
const updateExamStatus = async (req, res) => {
    try {
        const exam = await Exam.find({ id: req.params.id });

        if (exam) {
            const updatedExam = await Exam.findOneAndUpdate(
                {
                    id: req.params.id
                },
                {
                    $set: {
                        isActive: req.body.examStatus
                    }
                },
                {
                    new: true
                }
            );

            if (updatedExam) {
                res.status(200).json({
                    message: "Exam status updated successfully",
                    exams: updatedExam
                });
            } else {
                res.status(400).json({
                    message: "Exam not found"
                });
            }
        } else {
            res.status(400).json({
                message: "Failed to update exam status"
            });
        }


    } catch (error) {
        console.log(error.message);
    }

}

/* Function to delete an exam */
const deleteExam = async (req, res) => {
    try {
        const deletedExam = await Exam.findOneAndDelete({
            id: req.params.id,
        });

        if (deletedExam) {
            res.status(200).json({
                message: "Exam deleted successfully",
                exam: deletedExam
            });
        } else {
            res.status(400).json({
                message: "Failed to delete exam"
            });
        }

    } catch (error) {
        console.log(error.message);
    }
};

const examController = {
    getExams,
    getExam,
    addExam,
    addQuestions,
    removeQuestion,
    updateExam,
    updateExamStatus,
    deleteExam,
};


export default examController;