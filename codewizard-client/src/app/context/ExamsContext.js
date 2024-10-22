"use client";

import { React, createContext, useState } from 'react';

export const ExamsContext = createContext();

export function ExamsProvider({ children }) {
    const [data, setData] = useState([]);


    /* Function to add new exam */
    const createExam = async (exam) => {
        try {
            const response = await fetch("http://localhost:5000/api/v1/exams", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(exam),
            });

            if (response.ok) {
                const data = await response.json();

                const newExam = data.exam;

                setData((prevData) => [...prevData, newExam]);

                alert("Exam creation successful");

                window.location.reload();
            }

        } catch (error) {
            console.log("Error : " + error.message);
        }
    };

    /* Function to get all exams */
    const getAllExams = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/v1/exams");
            const data = await response.json();

            setData(data.exams);

        } catch (error) {
            console.error("Error : " + error.message);
        }
    };

    /* Function to get a particular exam */
    const getExam = async (examID) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/exams/${examID}`);
            const data = await response.json();

            return await data.exams[0];

        } catch (error) {
            console.error("Error : " + error.message);
        }
    };

    /* Function to add questions to an exam */
    const addQuestions = async (examID, questionsList) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/exams/${examID}/questions`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(questionsList),
            });

            if (response.ok) {
                // const data = await response.json();

                setData((prevData) => {
                    const index = prevData.findIndex((item) => item.id === examID);
                    if (index !== -1) {
                        prevData[index].questionsList.concat(questionsList);
                    }
                    return [...prevData];
                });

                alert("Successfully added questions");
                window.location.reload();
            } else {
                alert("Failed to add questions");
            }

        } catch (error) {
            console.error("Error : " + error.message);
        }
    }

    /* Function to remove a question from an exam */
    const removeQuestion = async (examID, questionIndex) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/exams/${examID}/questions/remove`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ questionToBeRemovedIndex: questionIndex }),
            });

            if (response.ok) {
                // const data = await response.json();

                setData((prevData) => {
                    const exam = prevData.filter((item) => item.id == examID);

                    if (exam.questionsList) {
                        exam.questionsList.findIndex((index) => index != questionIndex);

                        return [...prevData];
                    }

                });

            } else {
                alert("Failed to remove question");
            }

        } catch (error) {
            console.error("Error : " + error.message);
        }
    }


    /* Function to update an exam */
    const updateExam = async (examID, updatedExam) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/exams/update/${examID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedExam),
            });

            if (response.ok) {
                // const data = await response.json();

                setData((prevData) => {
                    const index = prevData.findIndex((item) => item.id === examID);
                    if (index !== -1) {
                        prevData[index] = updatedExam;
                    }
                    return [...prevData];
                });

                alert("Successfully updated exam");
            } else {
                alert("Exam updation failed!")
            }

        } catch (error) {
            console.error("Error : " + error.message);
        }
    };

    /* Function to update an exam's status */
    const updateExamStatus = async (examID, examStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/exams/${examID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ examStatus: examStatus }),
            });

            const data = await response.json();

            setData((prevData) => {
                const index = prevData.findIndex((item) => item.id === examID.id);
                if (index !== -1) {
                    prevData[index] = data.exams;
                }
                return [...prevData];
            });
        } catch (error) {
            console.error("Error : " + error.message);
        }
    };

    /* Function to delete an exam */
    const deleteExam = async (examID) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/exams/${examID}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            setData((prevData) => prevData.filter((item) => item.id !== examID));

        } catch (error) {
            console.error("Error : " + error.message);
        }
    };


    return (
        <ExamsContext.Provider value={{
            data,
            createExam,
            getAllExams,
            getExam,
            addQuestions,
            removeQuestion,
            updateExam,
            updateExamStatus,
            deleteExam
        }}>
            {children}
        </ExamsContext.Provider>
    );
}

